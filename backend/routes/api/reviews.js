const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, SpotsImage, Spot, ReviewImage, Review, Booking} = require('../../db/models');
//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require("sequelize");
const router = express.Router();

const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isString()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

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
            };

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

// Edit a Review
router.put('/:reviewId',
    requireAuth,
    validateNewReview,
    async (req, res) => {
        let { review, stars } = req.body;
        // Authorization
        let findUser = await User.findByPk(req.user.id);
        const editReview = await Review.findByPk(req.params.reviewId);
        findUser = findUser.toJSON();
        if (!editReview) res.json({ message: "Review couldn't be found" , statusCode: 404 });
        if (findUser.id !== editReview.userId) res.json({ message: "Only the owner of the review is authorized to add an image", statusCode: 403 });

        editReview.update({
            review,
            stars
        });

        return res.json(editReview)
    });

//Delete a Review
router.delete('/:reviewId',
    requireAuth,
    async (req, res) => {
        // Authorization
        let findUser = await User.findByPk(req.user.id);
        const deleteReview = await Review.findByPk(req.params.reviewId);
        findUser = findUser.toJSON();
        if (!deleteReview) res.json({ message: "Review couldn't be found" , statusCode: 404 });
        if (findUser.id !== deleteReview.userId) res.json({ message: "Only the owner of the review is authorized to add an image", statusCode: 403 });

        await deleteReview.destroy();

        res.json({ message: "Successfully deleted", statusCode: 200 })
    });

module.exports = router;
