const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, SpotsImage, Spot, ReviewImage, Review, Booking} = require('../../db/models');
//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current/reviews',
    requireAuth,
    async (req, res) => {
        const currentReviews = await Review.findAll({
            where: { userId: req.user.id },
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

module.exports = router;
