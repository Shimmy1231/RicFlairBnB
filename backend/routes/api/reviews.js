const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, SpotsImage, Spot, ReviewImage, Review, Booking} = require('../../db/models');
//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require("sequelize");

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const currentUsersSpots = await Spot.findAll({
            where: { ownerId: userId }
        });
        const currentReviews = await Review.findAll({
            where: { userId: userId },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] },
                { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } },
                { model: ReviewImage, attributes: ['id', 'url'] },
            ]
        });
        const results = [];

        for (let i = 0; i < currentReviews.length; i++) {
            let review = currentReviews[i];
            review = review.toJSON();

            // Preview Image for Spots
            for (let spot of currentUsersSpots) {
                spot = spot.toJSON();
                const previewImage = await SpotsImage.findAll({
                    raw: true,
                    where: { preview: true, spotId: spot.id },
                    attributes: ['preview', 'url']
                });
                if (previewImage.length) review.Spot.previewImage = previewImage[0].url;
                if (!previewImage.length) review.Spot.previewImage = null;
            }

            results.push(review);
        }

        return res.json({ Reviews: results })
    });

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images',
    requireAuth,
    async (req, res) => {
        let { url } = req.body;
        // Authorization
        let findUser = await User.findByPk(req.user.id);
        const findReview = await Review.findByPk(req.params.reviewId);
        findUser = findUser.toJSON();
        if (!findReview) res.json({ message: "Review couldn't be found" , statusCode: 404 });
        if (findUser.id !== findReview.userId) res.json({ message: "Only the owner of the review is authorized to add an image", statusCode: 403 });

        const reviewImage = await ReviewImage.create({
            reviewId: req.params.reviewId,
            url
        });

        const result = {
            id: reviewImage.reviewId,
            url: reviewImage.url
        };

        res.json(result)
    });

module.exports = router;
