/**
 * User.js
 *
 * @description :: User schema for storing users
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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
    photo: {
      type: 'string',
      defaultsTo: '',
      url: true
    },
    socialProfiles: {
      type: 'object',
      defaultsTo: {}
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.socialProfiles;
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
