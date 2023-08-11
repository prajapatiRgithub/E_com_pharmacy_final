const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
const expect = require('chai').expect;
const addressController = require('../../../api/controllers/AddressController');
const {
  inValidAddress,
  invalidCondition,
  invalidAttribute,
  emptyAttribute,
  invalidModel,
  validCity,
  validState,
  validCountry,
} = require('../../integration/envVariable/addressVariable');

describe('POST /api/user/city', () => {
  it('Should give validation error when not pass payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/user/city')
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
    const invalidModel = await supertest
      .post('/api/user/city')
      .send(inValidAddress)
      .expect(400);

    expect(invalidModel.status).eql(400);
    expect(invalidModel.body).to.be.an('object');
    expect(invalidModel.body).to.have.property('status').eql('error');
    expect(invalidModel.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidModel.body).to.have.property('data');
    expect(invalidModel.body.data).to.be.an('object');
    expect(invalidModel.body.data).to.have.property('model');
    expect(invalidModel.body.data.model).to.be.an('object');
    expect(invalidModel.body.data.model)
      .to.have.property('message')
      .eql('Model should be a type of text');
  });

  it('Should give validation error when condition is number in payload.', async () => {
    const conditionInvalid = await supertest
      .post('/api/user/city')
      .send(invalidCondition)
      .expect(400);

    expect(conditionInvalid.status).eql(400);
    expect(conditionInvalid.body).to.be.an('object');
    expect(conditionInvalid.body).to.have.property('status').eql('error');
    expect(conditionInvalid.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(conditionInvalid.body).to.have.property('data');
    expect(conditionInvalid.body.data).to.be.an('object');
    expect(conditionInvalid.body.data).to.have.property('condition');
    expect(conditionInvalid.body.data.condition).to.be.an('object');
    expect(conditionInvalid.body.data.condition)
      .to.have.property('message')
      .eql('Condition should be a type of object');
  });

  it('Should give validation error when attribute is number in payload.', async () => {
    const attributeInvalid = await supertest
      .post('/api/user/city')
      .send(invalidAttribute)
      .expect(400);

    expect(attributeInvalid.status).eql(400);
    expect(attributeInvalid.body).to.be.an('object');
    expect(attributeInvalid.body).to.have.property('status').eql('error');
    expect(attributeInvalid.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(attributeInvalid.body).to.have.property('data');
    expect(attributeInvalid.body.data).to.be.an('object');
    expect(attributeInvalid.body.data).to.have.property('attribute');
    expect(attributeInvalid.body.data.attribute).to.be.an('object');
    expect(attributeInvalid.body.data.attribute)
      .to.have.property('message')
      .eql('Attribute should be a type of array');
  });

  it('Should give validation error when attribute is empty in payload.', async () => {
    const invalidData = await supertest
      .post('/api/user/city')
      .send(emptyAttribute)
      .expect(400);

    expect(invalidData.status).eql(400);
    expect(invalidData.body).to.be.an('object');
    expect(invalidData.body).to.have.property('status').eql('error');
    expect(invalidData.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidData.body).to.have.property('data');
    expect(invalidData.body.data).to.be.an('object');
    expect(invalidData.body.data).to.have.property('attribute');
    expect(invalidData.body.data.attribute).to.be.an('object');
    expect(invalidData.body.data.attribute)
      .to.have.property('message')
      .eql('Attribute cannot be empty');
  });

  it('Should give failed to address when model is incorrect in payload.', async () => {
    const invalidData = await supertest
      .post('/api/user/city')
      .send(invalidModel)
      .expect(500);

    expect(invalidData.status).eql(500);
    expect(invalidData.body).to.be.an('object');
    expect(invalidData.body).to.have.property('status').eql('error');
    expect(invalidData.body)
      .to.have.property('message')
      .eql('Failed to address.');
  });
});

describe('POST, PUT, GET, DELETE', () => {
  it('Should allows user to get their address like city, state and country.', async () => {
    sinon.stub(addressController, 'address').resolves(200);

    //city
    const listOfData = await supertest
      .post('/api/user/city')
      .send(validCity)
      .expect(200);

    expect(listOfData.status).eql(200);
    expect(listOfData.body).to.be.an('object');
    expect(listOfData.body).to.have.property('status').eql('success');
    expect(listOfData.body)
      .to.have.property('message')
      .eql('List of data successfully');
    expect(listOfData.body).to.have.property('data');
    expect(listOfData.body.data).to.be.an('array');
    expect(listOfData.body.data[0]).to.have.property('id');
    expect(listOfData.body.data[0]).to.have.property('is_archived');

    //state
    const listOfState = await supertest
      .post('/api/user/state')
      .send(validState)
      .expect(200);

    expect(listOfState.status).eql(200);
    expect(listOfState.body).to.be.an('object');
    expect(listOfState.body).to.have.property('status').eql('success');
    expect(listOfState.body)
      .to.have.property('message')
      .eql('List of data successfully');
    expect(listOfState.body).to.have.property('data');
    expect(listOfState.body.data).to.be.an('array');
    expect(listOfState.body.data[0]).to.have.property('id');
    expect(listOfState.body.data[0]).to.have.property('is_archived');

    //country
    const listOfCountry = await supertest
      .post('/api/user/country')
      .send(validCountry)
      .expect(200);

    expect(listOfCountry.status).eql(200);
    expect(listOfCountry.body).to.be.an('object');
    expect(listOfCountry.body).to.have.property('status').eql('success');
    expect(listOfCountry.body)
      .to.have.property('message')
      .eql('List of data successfully');
    expect(listOfCountry.body).to.have.property('data');
    expect(listOfCountry.body.data).to.be.an('array');
    expect(listOfCountry.body.data[0]).to.have.property('id');
    expect(listOfCountry.body.data[0]).to.have.property('is_archived');
  });
});