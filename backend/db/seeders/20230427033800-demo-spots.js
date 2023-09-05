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
        address: "423 Looney Tunes Lane",
        city: "Flash",
        state: "Florida",
        country: "USA",
        lat: 27.76,
        lng: 81.69,
        name: "Fanny McFluffernutter",
        description: "Seaside Villa with Infinity Pool.",
        price: 3636,
      },
      {
        ownerId: 2,
        address: "523 Wakanda Lane",
        city: "Boombaya",
        state: "Washington",
        country: "USA",
        lat: 53.76,
        lng: 45.69,
        name: "Nutter Butter",
        description: "Luxury awaits you in this 3-bedroom penthouse with skyline views. Enjoy a private terrace, in-home theater, and a personal chef for a truly opulent stay.",
        price: 5654,
      },
      {
        ownerId: 1,
        address: "233 Looney Tunes Lane",
        city: "Flash",
        state: "California",
        country: "USA",
        lat: 27.76,
        lng: 81.69,
        name: "Polly Hahaheimer",
        description: "Wake up to the sound of waves in this beachfront villa. Relax in your private pool, unwind in the spa, and dine alfresco with ocean views.",
        price: 3636,
      },
      {
        ownerId: 3,
        address: "111 Laughter Lane",
        city: "Chuckleville",
        state: "Michigan",
        country: "USA",
        lat: 27.76,
        lng: 81.69,
        name: "Gigglesworth Ticklebottom",
        description: "Experience the grandeur of a French château. Indulge in vineyard tours, private wine tastings, and gourmet dining by your personal chef.",
        price: 3636,
      },
      {
        ownerId: 1,
        address: "123 Haha Street",
        city: "Smilesburg",
        state: "Oregon",
        country: "USA",
        lat: 27.76,
        lng: 81.69,
        name: "Benny Gigglepants",
        description: "Hit the slopes from your doorstep in this slopeside chalet. After skiing, warm up by the fireplace or soak in the outdoor hot tub.",
        price: 3636,
      },
      {
        ownerId: 1,
        address: "987 Chuckle Road",
        city: "Grinville",
        state: "Ohio",
        country: "USA",
        lat: 27.76,
        lng: 81.69,
        name: "Wanda Jokesalot",
        description: "Escape to a lush, private villa with a jungle view. Enjoy a private infinity pool, open-air living spaces, and a dedicated spa room.",
        price: 3636,
      },
      {
        ownerId: 1,
        address: "456 Funny Avenue",
        city: "Sillytown",
        state: "Iowa",
        country: "USA",
        lat: 27.76,
        lng: 81.69,
        name: "Chuckles McSnort",
        description: "The property is a wildlife sanctuary; spot sloths, colorful birds, and exotic butterflies right from your balcony.",
        price: 3636,
      },
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
          "Nutter Butter",
          "Polly Hahaheimer",
          "Gigglesworth Ticklebottom",
          "Benny Gigglepants",
          "Wanda Jokesalot",
          "Chuckles McSnort"
      ] }
    }, {});
  }
};
