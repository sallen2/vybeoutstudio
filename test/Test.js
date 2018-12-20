const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let expect = require('chai').expect;
let request = require('request');
const server = require('../server');

describe('Status and content', function (done) {
  describe('Main page', function () {
    it('status', function (done) {
      request('http://localhost:8080/', function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    describe('Create page', function () {
      it('status', function (done) {
        request('http://localhost:8080/create', function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
    describe('View page', function () {
      it('status', function (done) {
        request('http://localhost:8080/view', function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
    describe('API Data', function () {
      it('status', function (done) {
        request('http://localhost:8080/api/data', function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
    describe('Contribute page', function () {
      it('status', function (done) {
        request('http://localhost:8080/contribute', function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
});
