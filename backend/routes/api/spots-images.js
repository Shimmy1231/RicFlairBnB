const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotsImage, ReviewImage, Booking, Review, Sequelize } = require('../../db/models');
const { check, param } = require("express-validator");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");

router.delete('/:spotImageId', requireAuth, async (req, res, next) => {
    let deletedImage = await SpotImage.findByPk(req.params.spotImageId);
    if (!deletedImage) res.json({ message: "Spot Image couldn't be found", statusCode: 404 });
    await deletedImage.destroy();

    res.json({ message: "Successfully deleted", statusCode: 200 })
});

module.exports = router;
