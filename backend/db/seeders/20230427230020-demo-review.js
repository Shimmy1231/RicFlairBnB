'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Review } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: "This AirBnB was worth every penny! The view from the balcony was breathtaking and the interior design was top-notch. The amenities provided were luxurious and made our stay extremely comfortable. The host was also very accommodating and responsive to our needs. Highly recommend!",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 2,
        review: "I've stayed at many AirBnBs but this one takes the cake! The attention to detail in every aspect of this rental was impressive. From the high-end appliances to the plush bedding, no expense was spared. The location was also unbeatable, right in the heart of the city with stunning views. Will definitely be returning!",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 3,
        review: "If you're looking for a luxurious getaway, this AirBnB is the perfect choice. The modern and stylish design of the interior was matched by the stunning views from every window. The host was incredibly welcoming and made sure every detail was taken care of. It was truly a five-star experience.",
        stars: 3,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]:
        [
          '1',
          '2',
          '3',
      ] }
    }, {});
  }
};
