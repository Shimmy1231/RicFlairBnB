const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, SpotsImage, Spot, ReviewImage, Review, Booking} = require('../../db/models');
//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require("sequelize");
const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current',
    requireAuth,
    async (req, res) => {
        const results = [];
        const userId = req.user.id;
        const currentUserBookings = await Booking.findAll({
            where: { userId: userId },
            include: [
                { model: Spot, attributes: { exclude: ['spotId', 'description', 'createdAt', 'updatedAt'] } },
            ]
        });

        for (let i = 0; i < currentUserBookings.length; i++) {
            let booking = currentUserBookings[i];
            booking = booking.toJSON();

            // Preview Image for Spots
            for (let spot of currentUserBookings) {
                spot = spot.toJSON();
                const previewImage = await SpotsImage.findAll({
                    raw: true,
                    where: { preview: true, spotId: spot.id },
                    attributes: ['preview']
                });
                if (previewImage.length) booking.Spot.previewImage = previewImage[0].url;
                if (!previewImage.length) booking.Spot.previewImage = null;
            };

            results.push(booking);
        };

        return res.json({ Bookings: results })
    })

// Edit a Booking
router.put('/:bookingId',
    requireAuth,
    async (req, res) => {
        let { startDate, endDate } = req.body;
        // Authorization
        let findUser = await User.findByPk(req.user.id);
        findUser = findUser.toJSON();
        const editBooking = await Booking.findByPk(req.params.bookingId);
        if (!editBooking) res.json({ message: "Booking couldn't be found", statusCode: 404 });
        if (findUser.id !== editBooking.userId) res.json({ message: "Forbidden", statusCode: 403 });

        if (startDate > endDate) res.json({ message: "Validation Error", statusCode: 400, errors: { endDate: "endDate cannot come before startDate" }});

        let checkBooking = await Booking.findAll({ where: { id: req.params.bookingId } });
        for (let thisBooking of checkBooking) {
            let bookedStart = Date.parse(thisBooking.dataValues.startDate);
            let bookedEnd = Date.parse(thisBooking.dataValues.endDate);
            let checkStart = Date.parse(startDate);
            let checkEnd = Date.parse(endDate);
            if (bookedEnd > checkEnd) res.json({ message: "Past bookings can't be modified", statusCode: 403 });
            if ((bookedStart >= checkStart && bookedEnd <= checkEnd) || (bookedStart <= checkEnd && bookedEnd >= checkStart)) {
                return res.json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    statusCode: 403,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                })
            }
        };

        editBooking.update({
            startDate,
            endDate
        });

        return res.json(editBooking)
    });

// Delete a Booking
router.delete('/:bookingId',
    requireAuth,
    async (req, res) => {
        let date = new Date().toJSON();
        // Authorization
        let findUser = await User.findByPk(req.user.id);
        findUser = findUser.toJSON();
        const deleteBooking = await Booking.findByPk(req.params.bookingId);
        if (!deleteBooking) res.json({ message: "Booking couldn't be found", statusCode: 404 });
        if (findUser.id !== deleteBooking.userId) res.json({ message: "Forbidden", statusCode: 403 });
        if (deleteBooking.startDate.toJSON() <= date) res.json({ message: "Bookings that have been started can't be deleted", statusCode: 403 });

        await deleteBooking.destroy();

        res.json({ message: "Successfully deleted", statusCode: 200 });
    })


module.exports = router;
