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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-850690699426024775/original/9e31fffe-50e1-48c6-ba3d-0704b792c15c.jpeg?im_w=720',
        spotId: 1,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-810289294820802419/original/c200c58f-f8a6-4048-ba13-fdaf2d40962a.jpeg?im_w=720',
        spotId: 2,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48466465/original/2d6bbe61-f5bb-461a-be92-d0ae2f9d000f.jpeg?im_w=720',
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
