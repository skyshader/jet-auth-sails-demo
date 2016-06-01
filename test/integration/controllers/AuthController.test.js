var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;

describe('AuthController', function() {

  describe('#signup()', function() {
    it('should successfully create user', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/signup')
        .send({
          "username": "test",
          "email": "test@test.com",
          "password": "123456",
          "firstName": "Test"
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          assert.equal(res.body.user.username, 'test');
          assert.property(res.body, 'token');
          done();
        });
    });

    it('should fail to create user if required field is missing', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/signup')
        .send({
          "email": "test@test.com",
          "password": "123456",
          "firstName": "Test"
        })
        .expect('Content-Type', /json/)
        .expect(500, done);
    });

    it('should not create duplicate user', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/signup')
        .send({
          "username": "test",
          "email": "test@test.com",
          "password": "123456",
          "firstName": "Test"
        })
        .expect('Content-Type', /json/)
        .expect(500, done);
    });
  });

  describe('#login()', function() {
    it('should login user successfully with valid credentials', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/signin')
        .send({
          "email": "test@test.com",
          "password": "123456"
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          assert.equal(res.body.user.email, 'test@test.com');
          assert.property(res.body, 'token');
          sails.config.globals.apiAuthToken = res.body.token;
          done();
        });
    });

    it('should not allow login user with invalid credentials', function (done) {
      request(sails.hooks.http.app)
        .post('/auth/signin')
        .send({
          "email": "test@test.com",
          "password": "1234567"
        })
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

});
