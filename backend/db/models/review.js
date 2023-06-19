'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One to Many relationship of a User having many Reviews
      Review.belongsTo(models.User, { foreignKey: 'userId' });

      // One to Many relationship of a Spot having many Reviews
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });

      // One to Many relationship of a Review having many ReviewImages
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' });
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    review: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
        isNumeric: true,
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
