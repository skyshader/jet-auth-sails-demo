var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var jwtSettings = sails.config.jwtSettings;

module.exports = {
  secret: jwtSettings.secret,
  issuer: jwtSettings.issuer,
  audience: jwtSettings.audience,

  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }
  },

  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function (password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  /**
   * Create token for the passed user
   * @param user
   */
  createToken: function (user) {
    return jwt.sign({
        user: user.toJSON()
      },
      jwtSettings.secret,
      {
        algorithm: jwtSettings.algorithm,
        expiresIn: jwtSettings.expiresIn,
        issuer: jwtSettings.issuer,
        audience: jwtSettings.audience
      }
    );
  }
};
