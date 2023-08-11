const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, expireToken } = require('../../env.json');
const searchController = require('../../../api/controllers/SearchController');
const expect = require('chai').expect;
const {
  searchData,
  checkValidation,
  missingCartData,
  checkEmptyValidation,
} = require('../envVariable/searchVariables');

describe('POST /api/search/addSearch', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/search/addSearch')
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
      .post('/api/search/addSearch')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when not pass payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/search/addSearch')
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
    expect(emptyPayload.body.data).to.have.property('message');
    expect(emptyPayload.body.data.message).to.be.an('object');
    expect(emptyPayload.body.data.message)
      .to.have.property('message')
      .eql('Message is Required');
  });

  it('Should give validation error when user id is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/search/addSearch')
      .set('authorization', token)
      .send(checkValidation)
      .expect(400);

    expect(checkPayloadValidation.status).eql(400);
    expect(checkPayloadValidation.body).to.be.an('object');
    expect(checkPayloadValidation.body).to.have.property('status').eql('error');
    expect(checkPayloadValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkPayloadValidation.body).to.have.property('data');
    expect(checkPayloadValidation.body.data).to.be.an('object');
    expect(checkPayloadValidation.body.data).to.have.property('user_id');
    expect(checkPayloadValidation.body.data.user_id).to.be.an('object');
    expect(checkPayloadValidation.body.data.user_id)
      .to.have.property('message')
      .eql('User id should be a type of number');
  });

  it('Should give validation error when not passing user id in payload.', async () => {
    const missingField = await supertest
      .post('/api/search/addSearch')
      .set('authorization', token)
      .send(missingCartData)
      .expect(400);

    expect(missingField.status).eql(400);
    expect(missingField.body).to.be.an('object');
    expect(missingField.body).to.have.property('status').eql('error');
    expect(missingField.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingField.body).to.have.property('data');
    expect(missingField.body.data).to.be.an('object');
    expect(missingField.body.data).to.have.property('user_id');
    expect(missingField.body.data.user_id).to.be.an('object');
    expect(missingField.body.data.user_id)
      .to.have.property('message')
      .eql('User id is Required');
  });

  it('Should give validation error when message is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .post('/api/search/addSearch')
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
    expect(checkEmptyValue.body.data).to.have.property('message');
    expect(checkEmptyValue.body.data.message).to.be.an('object');
    expect(checkEmptyValue.body.data.message)
      .to.have.property('message')
      .eql('Message cannot be an empty field');
  });

  it('Should give success when record inserted successfully.', async () => {
    sinon.stub(searchController, 'addSearch').resolves(200);
    const insertSearch = await supertest
      .post('/api/search/addSearch')
      .set('authorization', token)
      .send(searchData)
      .expect(200);

    expect(insertSearch.status).eql(200);
    expect(insertSearch.body).to.be.an('object');
    expect(insertSearch.body).to.have.property('status').eql('success');
    expect(insertSearch.body)
      .to.have.property('message')
      .eql('Search added successfully');
  });
});

describe('GET /api/search/recentlySearch', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/search/recentlySearch')
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
      .get('/api/search/recentlySearch')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give success when record get successfully.', async () => {
    sinon.stub(searchController, 'recentlySearch').resolves(200);
    const getPayment = await supertest
      .get('/api/search/recentlySearch')
      .set('authorization', token)
      .expect(200);

    expect(getPayment.status).eql(200);
    expect(getPayment.body).to.be.an('object');
    expect(getPayment.body).to.have.property('status').eql('success');
    expect(getPayment.body)
      .to.have.property('message')
      .eql('List of all search data');
    expect(getPayment.body).to.have.property('data');
    expect(getPayment.body.data).to.be.an('array');
    expect(getPayment.body.data[0]).to.have.property('id');
    expect(getPayment.body.data[0]).to.have.property('user_id');
  });
});
