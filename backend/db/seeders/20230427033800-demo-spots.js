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
        description: "Luxurious Penthouse with Panoramic Views: This stunning penthouse apartment boasts breathtaking views of the city skyline from its floor-to-ceiling windows. The modern decor is complemented by plush furnishings and top-of-the-line amenities, making it the perfect choice for discerning travelers.",
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
        description: "Private Mansion with Pool and Gardens: This sprawling estate is nestled on several acres of landscaped gardens and boasts a sparkling pool, hot tub, and multiple outdoor lounging areas. The interior is just as impressive, with high-end finishes and elegant furnishings throughout.",
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
        description: "Seaside Villa with Infinity Pool: This stunning villa is perched on a cliff overlooking the ocean, with sweeping views of the coastline. The infinity pool seems to merge seamlessly with the sea, creating a sense of tranquil luxury that's hard to beat.",
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
