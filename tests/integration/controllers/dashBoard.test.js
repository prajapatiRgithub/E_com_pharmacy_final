const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
const expect = require('chai').expect;
const dashBoardController = require('../../../api/controllers/DashBoardController');
const { token, expireToken } = require('../../env.json');

describe('GET /api/admin/dashBoard/countOfData', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/admin/dashBoard/countOfData')
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
      .get('/api/admin/dashBoard/countOfData')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });
});

describe('GET /api/admin/dashBoard/graphOfCustomer', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/admin/dashBoard/graphOfCustomer')
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
      .get('/api/admin/dashBoard/graphOfCustomer')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });
});

describe('GET /api/admin/dashBoard/recentlyRegistration', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/admin/dashBoard/recentlyRegistration')
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
      .get('/api/admin/dashBoard/recentlyRegistration')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });
});

describe('GET /api/admin/dashBoard/listOfOrder', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/admin/dashBoard/listOfOrder')
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
      .get('/api/admin/dashBoard/listOfOrder')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });
});

describe('POST, PUT, GET, DELETE', () => {
  //countOfData
  it('Should allows admin to get their statistics value', async () => {
    sinon.stub(dashBoardController, 'countOfData').resolves(200);
    const countOfData = await supertest
      .get('/api/admin/dashBoard/countOfData')
      .set('authorization', token)
      .expect(200);

    expect(countOfData.status).eql(200);
    expect(countOfData.body).to.be.an('object');
    expect(countOfData.body).to.have.property('status').eql('success');
    expect(countOfData.body)
      .to.have.property('message')
      .eql('List of all statistics.');
    expect(countOfData.body).to.have.property('data');
    expect(countOfData.body.data).to.be.an('object');;
    expect(countOfData.body.data).to.have.property('ActiveCustomer');
    expect(countOfData.body.data).to.have.property('Customer');

    //graphOfCustomer
    sinon.stub(dashBoardController, 'graphOfCustomer').resolves(200);
    const graphOfCustomer = await supertest
      .get('/api/admin/dashBoard/graphOfCustomer')
      .set('authorization', token)
      .expect(200);

    expect(graphOfCustomer.status).eql(200);
    expect(graphOfCustomer.body).to.be.an('object');
    expect(graphOfCustomer.body).to.have.property('status').eql('success');
    expect(graphOfCustomer.body)
      .to.have.property('message')
      .eql('List of users');
    expect(graphOfCustomer.body).to.have.property('data');
    expect(graphOfCustomer.body.data).to.be.an('array');
    expect(graphOfCustomer.body.data[0]).to.have.property('count');
    expect(graphOfCustomer.body.data[0]).to.have.property('month');
    expect(graphOfCustomer.body.data[0]).to.have.property('Year');

    //recentlyRegistration
    sinon.stub(dashBoardController, 'recentlyRegistration').resolves(200);
    const recentlyRegistration = await supertest
      .get('/api/admin/dashBoard/recentlyRegistration')
      .set('authorization', token)
      .expect(200);

    expect(recentlyRegistration.status).eql(200);
    expect(recentlyRegistration.body).to.be.an('object');
    expect(recentlyRegistration.body).to.have.property('status').eql('success');
    expect(recentlyRegistration.body)
      .to.have.property('message')
      .eql('List of users');
    expect(recentlyRegistration.body).to.have.property('data');
    expect(recentlyRegistration.body.data).to.be.an('array');
    expect(recentlyRegistration.body.data[0]).to.have.property('id');
    expect(recentlyRegistration.body.data[0]).to.have.property('is_archived');
    expect(recentlyRegistration.body.data[0]).to.have.property('first_name');

    //listOfOrder
    sinon.stub(dashBoardController, 'listOfOrder').resolves(200);
    const listOfOrder = await supertest
      .get('/api/admin/dashBoard/recentlyRegistration')
      .set('authorization', token)
      .expect(200);

    expect(listOfOrder.status).eql(200);
    expect(listOfOrder.body).to.be.an('object');
    expect(listOfOrder.body).to.have.property('status').eql('success');
    expect(listOfOrder.body).to.have.property('message').eql('List of users');
    expect(listOfOrder.body).to.have.property('data');
    expect(listOfOrder.body.data).to.be.an('array');
    expect(listOfOrder.body.data[0]).to.have.property('id');
    expect(listOfOrder.body.data[0]).to.have.property('is_archived');
    expect(listOfOrder.body.data[0]).to.have.property('last_name');
  });
});