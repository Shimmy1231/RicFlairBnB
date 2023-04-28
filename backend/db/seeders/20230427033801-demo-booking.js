'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Booking } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date("2023-05-01"),
        endDate: new Date("2023-05-15"),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date("2023-06-01"),
        endDate: new Date("2023-06-15"),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date("2023-07-01"),
        endDate: new Date("2023-07-15"),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]:
        [
          1,
          2,
          3,
      ] }
    }, {});
  }
};
