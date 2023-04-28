'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { SpotsImage } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotsImages';
    return queryInterface.bulkInsert(options, [
      {
        url: 'jkl.com',
        spotId: 1,
        preview: true
      },
      {
        url: 'mno.com',
        spotId: 2,
        preview: true
      },
      {
        url: 'pqr.com',
        spotId: 3,
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotsImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]:
        [
          1,
          2,
          3,
      ] }
    }, {});
  }
};
