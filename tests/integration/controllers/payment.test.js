const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, invalidToken, expireToken } = require('../../env.json');
const paymentController = require('../../../api/controllers/PaymentController');
const {
  paymentData,
  missingPaymentData,
  checkValidation,
  checkEnumValidation,
} = require('../envVariable/paymentVariables');
const expect = require('chai').expect;

describe('POST /api/payment/addPayment', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/payment/addPayment')
      .expect(401);

    expect(missingToken.status).eql(401);
    expect(missingToken.body).to.be.an('object');
    expect(missingToken.body).to.have.property('status').eql('error');
    expect(missingToken.body)
      .to.have.property('message')
      .eql('Authorization header is missing');
  });

  it(`Should give valid access required when pass another user's token.`, async () => {
    const invalidAccessToken = await supertest
      .post('/api/payment/addPayment')
      .set('authorization', invalidToken)
      .expect(401);

    expect(invalidAccessToken.status).eql(401);
    expect(invalidAccessToken.body).to.be.an('object');
    expect(invalidAccessToken.body).to.have.property('status').eql('error');
    expect(invalidAccessToken.body)
      .to.have.property('message')
      .eql('Valid access required');
  });

  it('Should give token expired when token is expired.', async () => {
    const expireAccessToken = await supertest
      .post('/api/payment/addPayment')
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
      .post('/api/payment/addPayment')
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
    expect(emptyPayload.body.data).to.have.property('user_id');
    expect(emptyPayload.body.data.user_id).to.be.an('object');
    expect(emptyPayload.body.data.user_id)
      .to.have.property('message')
      .eql('User id is Required');
  });

  it('Should give validation error when not passing payment_type in payload.', async () => {
    const missingField = await supertest
      .post('/api/payment/addPayment')
      .set('authorization', token)
      .send(missingPaymentData)
      .expect(400);

    expect(missingField.status).eql(400);
    expect(missingField.body).to.be.an('object');
    expect(missingField.body).to.have.property('status').eql('error');
    expect(missingField.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingField.body).to.have.property('data');
    expect(missingField.body.data).to.be.an('object');
    expect(missingField.body.data).to.have.property('payment_type');
    expect(missingField.body.data.payment_type).to.be.an('object');
    expect(missingField.body.data.payment_type)
      .to.have.property('message')
      .eql('Payment type is Required');
  });

  it('Should give validation error when order_id is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/payment/addPayment')
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
    expect(checkPayloadValidation.body.data).to.have.property('order_id');
    expect(checkPayloadValidation.body.data.order_id).to.be.an('object');
    expect(checkPayloadValidation.body.data.order_id)
      .to.have.property('message')
      .eql('Order id should be a type of number');
  });

  it('Should give validation error when payment_status is incorrect in payload.', async () => {
    const checkEnumValue = await supertest
      .post('/api/payment/addPayment')
      .set('authorization', token)
      .send(checkEnumValidation)
      .expect(400);

    expect(checkEnumValue.status).eql(400);
    expect(checkEnumValue.body).to.be.an('object');
    expect(checkEnumValue.body).to.have.property('status').eql('error');
    expect(checkEnumValue.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkEnumValue.body).to.have.property('data');
    expect(checkEnumValue.body.data).to.be.an('object');
    expect(checkEnumValue.body.data).to.have.property('payment_status');
    expect(checkEnumValue.body.data.payment_status).to.be.an('object');
    expect(checkEnumValue.body.data.payment_status)
      .to.have.property('message')
      .eql(`Payment status must be a 'success', 'pending', 'failed'`);
  });
});

describe('GET /api/payment/historyOfPayment/:order_id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/payment/historyOfPayment/6')
      .expect(401);

    expect(missingToken.status).eql(401);
    expect(missingToken.body).to.be.an('object');
    expect(missingToken.body).to.have.property('status').eql('error');
    expect(missingToken.body)
      .to.have.property('message')
      .eql('Authorization header is missing');
  });

  it(`Should give valid access required when pass another user's token.`, async () => {
    const invalidAccessToken = await supertest
      .get('/api/payment/historyOfPayment/6')
      .set('authorization', invalidToken)
      .expect(401);

    expect(invalidAccessToken.status).eql(401);
    expect(invalidAccessToken.body).to.be.an('object');
    expect(invalidAccessToken.body).to.have.property('status').eql('error');
    expect(invalidAccessToken.body)
      .to.have.property('message')
      .eql('Valid access required');
  });

  it('Should give token expired when token is expired.', async () => {
    const expireAccessToken = await supertest
      .get('/api/payment/historyOfPayment/6')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give id not found when id is not present in db.', async () => {
    const checkIdValidation = await supertest
      .get('/api/payment/historyOfPayment/1000')
      .set('authorization', token)
      .expect(200);

    expect(checkIdValidation.status).eql(200);
    expect(checkIdValidation.body).to.be.an('object');
    expect(checkIdValidation.body).to.have.property('status').eql('error');
    expect(checkIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });

  it('Should give validation error when id is string in params.', async () => {
    const failedPayment = await supertest
      .get('/api/payment/historyOfPayment/abc')
      .set('authorization', token)
      .expect(400);

    expect(failedPayment.status).eql(400);
    expect(failedPayment.body).to.be.an('object');
    expect(failedPayment.body).to.have.property('status').eql('error');
    expect(failedPayment.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(failedPayment.body).to.have.property('data');
    expect(failedPayment.body.data).to.be.an('object');
    expect(failedPayment.body.data).to.have.property('order_id');
    expect(failedPayment.body.data.order_id).to.be.an('object');
    expect(failedPayment.body.data.order_id)
      .to.have.property('message')
      .eql('Order id should be a type of number');
  });
});

describe('POST, GET', () => {
  let id = null;
  it('Should allows user to add and get their favorite payment.', async () => {
    sinon.stub(paymentController, 'addPayment').resolves(200);
    const insertPayment = await supertest
      .post('/api/payment/addPayment')
      .set('authorization', token)
      .send(paymentData)
      .expect(200);

    expect(insertPayment.status).eql(200);
    expect(insertPayment.body).to.be.an('object');
    expect(insertPayment.body).to.have.property('status').eql('success');
    expect(insertPayment.body)
      .to.have.property('message')
      .eql('Payment added successfully');

    id = insertPayment.body.data.order_id;

    sinon.stub(paymentController, 'historyOfPayment').resolves(200);
    const getPayment = await supertest
      .get(`/api/payment/historyOfPayment/${id}`)
      .set('authorization', token)
      .expect(200);

    expect(getPayment.status).eql(200);
    expect(getPayment.body).to.be.an('object');
    expect(getPayment.body).to.have.property('status').eql('success');
    expect(getPayment.body)
      .to.have.property('message')
      .eql('List of payment data');
    expect(getPayment.body).to.have.property('data');
    expect(getPayment.body.data).to.be.an('array');
    expect(getPayment.body.data[0]).to.have.property('user_id');
    expect(getPayment.body.data[0]).to.have.property('order_id');
  });
});
