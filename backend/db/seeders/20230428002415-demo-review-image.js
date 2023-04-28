'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Booking } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        url: 'abc.com',
        reviewId: 1,
      },
      {
        url: 'def.com',
        reviewId: 2,
      },
      {
        url: 'ghi.com',
        reviewId: 3,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]:
        [
          1,
          2,
          3,
      ] }
    }, {});
  }
};
