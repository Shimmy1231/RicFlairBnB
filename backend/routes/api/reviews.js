const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, SpotsImage, Spot, ReviewImage, Review, Booking} = require('../../db/models');
//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require("sequelize");

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current/reviews',
    requireAuth,
    async (req, res) => {
        const currentReviews = await Review.findAll({
            where: { userId: req.User.id },
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] },
                { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } },
                { model: ReviewImage, attributes: ['id', 'url'] }
            ]
        });
        const results = [];

        for (let i = 0; i < currentReviews.length; i++) {
            let review = currentReviews[i];
            review = review.toJSON();
            const previewImage = await ReviewImage.findAll({
                raw: true,
                where: { preview: true, reviewId: review.id },
                attributes: ['url']
            });
            if (previewImage.length) review.previewImage = previewImage[0].url;
            if (!previewImage.length) review.previewImage = null;
            results.push(review);
        }

        return res.json({ Reviews: results })
    });

// Add an Image to a Review based on the Review's id
// router.post('/:reviewId/images',
//     requireAuth,
//     async (req, res) => {
//         let { url } = req.body;
//         const findReview = await Review.findByPk(req.params.reviewId);
//         if (!findReview) res.json({ message: "Review couldn't be found", statusCode: 404 });

//         const reviewImage = await ReviewImage.create({

//         })
//     })

module.exports = router;
