const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, expireToken } = require('../../env.json');
const commonController = require('../../../api/controllers/CommonController');
const {
  listOfBannerData,
  wrongListBannerData,
  checkListBannerValidation,
  checkObjectValidation,
  checkArrayValidation,
  checkEmptyValidation,
} = require('../envVariable/bannerVariables');
const expect = require('chai').expect;

describe('POST /api/banner/listOfBanner', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/banner/listOfBanner')
      .expect(401);

    expect(missingToken.status).eql(401);
    expect(missingToken.body).to.be.an('object');
    expect(missingToken.body).to.have.property('status').eql('error');
    expect(missingToken.body)
      .to.have.property('message')
      .eql('Authorization header is missing');
  });

  it('Should give token expired when token is expired.', async () => {
    const expireAccessToken = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give error when pass wrong model name in payload.', async () => {
    const wrongBanner = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', token)
      .send(wrongListBannerData)
      .expect(500);

    expect(wrongBanner.status).eql(500);
    expect(wrongBanner.body).to.be.an('object');
    expect(wrongBanner.body).to.have.property('status').eql('error');
    expect(wrongBanner.body)
      .to.have.property('message')
      .eql('Failed to listData');
  });

  it('Should give validation error when not pass payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', token)
      .send({})
      .expect(400);

    expect(emptyPayload.status).eql(400);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('error');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emptyPayload.body).to.have.property('data');
    expect(emptyPayload.body.data).to.be.an('object');
    expect(emptyPayload.body.data).to.have.property('model');
    expect(emptyPayload.body.data.model).to.be.an('object');
    expect(emptyPayload.body.data.model)
      .to.have.property('message')
      .eql('Model is Required');
  });

  it('Should give validation error when model is number in payload.', async () => {
    const checkValidation = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', token)
      .send(checkListBannerValidation)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('model');
    expect(checkValidation.body.data.model).to.be.an('object');
    expect(checkValidation.body.data.model)
      .to.have.property('message')
      .eql('Model should be a type of text');
  });

  it('Should give validation error when condition is array in payload.', async () => {
    const checkValidation = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', token)
      .send(checkObjectValidation)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('condition');
    expect(checkValidation.body.data.condition).to.be.an('object');
    expect(checkValidation.body.data.condition)
      .to.have.property('message')
      .eql('Condition should be a type of object');
  });

  it('Should give validation error when attribute is object in payload', async () => {
    const checkValidation = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', token)
      .send(checkArrayValidation)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('attribute');
    expect(checkValidation.body.data.attribute).to.be.an('object');
    expect(checkValidation.body.data.attribute)
      .to.have.property('message')
      .eql('Attribute should be a type of array');
  });

  it('Should give validation error when model is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', token)
      .send(checkEmptyValidation)
      .expect(400);

    expect(checkEmptyValue.status).eql(400);
    expect(checkEmptyValue.body).to.be.an('object');
    expect(checkEmptyValue.body).to.have.property('status').eql('error');
    expect(checkEmptyValue.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkEmptyValue.body).to.have.property('data');
    expect(checkEmptyValue.body.data).to.be.an('object');
    expect(checkEmptyValue.body.data).to.have.property('model');
    expect(checkEmptyValue.body.data.model).to.be.an('object');
    expect(checkEmptyValue.body.data.model)
      .to.have.property('message')
      .eql('Model is not allowed to be empty');
  });

  it('Should give success when record get successfully.', async () => {
    sinon.stub(commonController, 'listData').resolves(200);
    const listOfBanner = await supertest
      .post('/api/banner/listOfBanner')
      .set('authorization', token)
      .send(listOfBannerData)
      .expect(200);

    expect(listOfBanner.status).eql(200);
    expect(listOfBanner.body).to.be.an('object');
    expect(listOfBanner.body).to.have.property('status').eql('success');
    expect(listOfBanner.body)
      .to.have.property('message')
      .eql('List of data successfully');
    expect(listOfBanner.body).to.have.property('data');
    expect(listOfBanner.body.data).to.be.an('array');
    expect(listOfBanner.body.data[0]).to.have.property('id');
    expect(listOfBanner.body.data[0]).to.have.property('image');
  });
});
