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
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-622570258364749956/original/671c053a-e09b-4d7a-b909-647cc84f0034.jpeg?im_w=720',
        spotId: 4,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/3cb09f8f-8dff-4568-b888-27ac16e5ec6d.jpg?im_w=720',
        spotId: 5,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-730525046849031055/original/f023bd69-59e0-4d92-9f55-4a6963548350.jpeg?im_w=720',
        spotId: 6,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-821351088798393872/original/45c01f48-1812-411c-9f3a-b35a04ecb229.jpeg?im_w=720',
        spotId: 7,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/53c57fb3-9bce-4d2a-9987-0e82d2b832a7.jpg?im_w=720',
        spotId: 8,
        preview: true
      },
      {
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-547988410906460205/original/e9f27f80-6481-4718-8b58-3497fd8b6ba0.jpeg?im_w=720',
        spotId: 9,
        preview: true
      },
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
