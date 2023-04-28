'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // One to Many relationship of a User having many Spots
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: "CASCADE", hooks: true });

      // One to Many relationship of a User having many Reviews
      User.hasMany(models.Review, { foreignKey: 'userId', onDelete: "CASCADE", hooks: true });

      // One to Many relationship of a User having many Bookings
      User.hasMany(models.Booking, { foreignKey: 'userId', onDelete: "CASCADE", hooks: true });

    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[1, 45],
          isAlpha: true,
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len:[1, 45],
          isAlpha: true,
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};
