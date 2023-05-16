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




module.exports = router;
