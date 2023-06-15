'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Spot } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Sesame Street",
        city: "Batman",
        state: "California",
        country: "USA",
        lat: 37.25,
        lng: 119.75,
        name: "Binky Tinklehoff",
        description: "Luxurious Penthouse with Panoramic Views",
        price: 1998,
      },
      {
        ownerId: 2,
        address: "234 Electric Avenue",
        city: "Superman",
        state: "New York City",
        country: "USA",
        lat: 40.71,
        lng: 74.00,
        name: "Wanda Bologna",
        description: "Private Mansion with Pool and Gardens",
        price: 2525,
      },
      {
        ownerId: 3,
        address: "Looney Tunes Lane",
        city: "Flash",
        state: "Florida",
        country: "USA",
        lat: 27.76,
        lng: 81.69,
        name: "Fanny McFluffernutter",
        description: "Seaside Villa with Infinity Pool.",
        price: 3636,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]:
        [
          "Binky Tinklehoff",
          "Wanda Bologna",
          "Fanny McFluffernutter",
      ] }
    }, {});
  }
};
