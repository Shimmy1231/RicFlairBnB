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
        review: "This AirBnB was worth every penny!",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 2,
        review: "I've stayed at many AirBnBs but this one takes the cake!",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 3,
        review: "If you're looking for a luxurious getaway, this AirBnB is the perfect choice.",
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
