const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, SpotsImage, Spot, ReviewImage, Review, Booking} = require('../../db/models');
//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize } = require("sequelize");


const router = express.Router();

const validateNewSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat()
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

// Get all Spots
router.get('/',
    async (req, res) => {
        // Pagination
        let { page, size } = req.query;
        if (!page || page < 1) page = 0;
        if (!size || size < 1) size = 8;

        page = parseInt(page);
        size = parseInt(size);

        const pagination = {};
        if (page > 0 && size > 0) {
            pagination.limit = size;
            pagination.offset = size * (page);
        };

        const spots = await Spot.findAll({ ...pagination });
        let results = [];

        // Check for Average Rating and Preview
        for (let i = 0; i < spots.length; i++) {
            let theSpot = spots[i];
            theSpot = theSpot.toJSON();

            const avgRating = await Review.findAll({
                raw: true,
                where: { spotId: theSpot.id },
                attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
            });

            const previewImage = await SpotsImage.findAll({
                raw: true,
                where: { preview: true, spotId: theSpot.id },
                attributes: ['url'],
            });

            if (avgRating.length) theSpot.avgRating = Number(avgRating[0].avgRating).toFixed(1);
            if (!previewImage.length) theSpot.previewImage = null;
            if (previewImage.length) theSpot.previewImage = previewImage[0].url;

            results.push(theSpot);
        };

        return res.json({ Spots: results, page, size })
    }
);

// Get all Spots owned by Current User
router.get('/current',
    async (req, res) => {
        const userId = req.user.id;
        const currentUsersSpots = await Spot.findAll({ where: { ownerId: userId } });
        const results = [];

        for (let i = 0; i < currentUsersSpots.length; i++) {
            let spot = currentUsersSpots[i];
            spot = spot.toJSON();
            const avgRating = await Review.findAll({
                raw: true,
                where: { spotId: spot.id },
                attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
            });

            const previewImage = await SpotsImage.findAll({
                raw: true,
                where: { preview: true, spotId: spot.id },
                attributes: ['url']
            });
            if (avgRating.length) spot.avgRating = Number(avgRating[0].avgRating).toFixed(1);
            if (previewImage.length) spot.previewImage = previewImage[0].url;
            if (!previewImage.length) spot.previewImage = null
            results.push(spot)
        }

        return res.json({ Spots: results })
});

// Get details for a Spot from an id
router.get('/:spotId',
    async (req, res) => {
        let thisSpot = await Spot.findByPk(req.params.spotId, {
            include: [
                { model: SpotsImage, attributes: ['id', 'url', 'preview'] },
                { model: SpotsImage, attributes: { exclude: ['spotId', 'createdAt', 'updatedAt'] } },
                { model: User, attributes: ['id', 'firstName', 'lastName'] }
            ]
        });
        if (!thisSpot) res.json({ message: "Spot couldn't be found", statusCode: 404 });
        thisSpot = thisSpot.toJSON();

        // Number of reviews for a Spot from an id
        const numReviews = await Review.findAll({ where: { spotId: req.params.spotId } });
        thisSpot.numReviews = numReviews.length;

        // Average Rating of reviews for a Spot from an id
        const avgRating = await Review.findAll({
            raw: true,
            where: { spotId: req.params.spotId },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        });

        if (avgRating.length) thisSpot.avgRating = Number(avgRating[0].avgRating).toFixed(1);

        return res.json(thisSpot)
});

// Create a Spot
router.post('/',
    requireAuth,
    validateNewSpot,
        async (req, res) => {
           let { address, city, state, country, lat, lng, name, description, price } = req.body;
           const user = await User.findByPk(req.user.id)
           const newSpot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
           });
           return res.json(newSpot)
        });

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images',
    requireAuth,
    async (req, res) => {
        let { url, preview } = req.body;
        const findSpot = await Spot.findByPk(req.params.spotId);
        if(!findSpot) res.json({ message: "Spot couldn't be found", statusCode: 404 });

        const spotImage = await SpotsImage.create({
            spotId: req.params.spotId,
            url,
            preview
        });

        const result = {
            id: spotImage.id,
            url: spotImage.url,
            preview: spotImage.preview
        };

        res.json(result)
    });

// Edit a Spot
router.put('/:spotId',
    requireAuth,
    validateNewSpot,
    async (req, res) => {
        let { address, city, state, country, lat, lng, name, description, price } = req.body;

        const editSpot = await Spot.findByPk(req.params.spotId);
        if(!editSpot) res.json({ message: "Spot couldn't be found", statusCode: 404 });

        editSpot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        return res.json(editSpot)
    })


// Delete a Spot
router.delete('/:spotId',
    requireAuth,
    async (req, res) => {
        const deleteSpot = await Spot.findByPk(req.params.spotId);

        if(!deleteSpot) res.json({ message: "Spot couldn't be found", statusCode: 404 });

        await deleteSpot.destroy();

        res.json({ message: "Successfully deleted", statusCode: 200})
    })

    module.exports = router;
