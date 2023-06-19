const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotsImage, ReviewImage, Booking, Review } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Sequelize } = require("sequelize");

router.delete('/:spotImageId',
    requireAuth,
    async (req, res) => {
        // Authorization
        let findUser = await User.findByPk(req.user.id);
        const findSpot = await Spot.findByPk(req.params.spotImageId);
        findUser = findUser.toJSON();
        if (findUser.id !== findSpot.ownerId) res.json({ message: "Forbidden", statusCode: 403 });

        let deletedImage = await SpotsImage.findByPk(req.params.spotImageId);
        if (!deletedImage) res.json({ message: "Spot Image couldn't be found", statusCode: 404 });
        await deletedImage.destroy();

        res.json({ message: "Successfully deleted", statusCode: 200 })
    });

module.exports = router;
