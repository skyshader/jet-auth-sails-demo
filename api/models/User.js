/**
 * User.js
 *
 * @description :: Schema for User model for mongo
 */

module.exports = {
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    firstName: {
      type: 'string',
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeUpdate: function (values, next) {
    JWTService.hashPassword(values);
    next();
  },
  beforeCreate: function (values, next) {
    JWTService.hashPassword(values);
    next();
  }
};

