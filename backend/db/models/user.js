'use strict';
const { Model, Validator, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //Current User by id
    static async getCurrentUser(id) {
      return User.scope('currentUser').findByPk(id);
    };

    // Sign-up verification
    static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.findByPk(user.id);
    };

    // Authorization
    static async matchUser( userId ) {
      let findUser = await User.findByPk(userId);
      let reply = {};
      findUser = findUser.toJSON();
      if(findUser.id !== userId) {
        reply.message = "Forbidden",
        reply.statusCode = 404
      };
      return reply;
    };


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
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
          exclude: ["hashedPassword", "username", "createdAt", "updatedAt"]
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ["hashedPassword", "createdAt", "updatedAt"]
          }
        },
      },

    }
  );
  return User;
};
