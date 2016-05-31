var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;

describe('UserController', function() {

  describe('#user()', function () {
    it('should list all users if token provided', function (done) {
      request(sails.hooks.http.app)
        .get('/user')
        .set('Authorization', 'JWT ' + sails.config.globals.apiAuthToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          assert.equal(res.body.length, 1);
          done();
        });
    });

    it('should not list all users if token not provided', function (done) {
      request(sails.hooks.http.app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

});
