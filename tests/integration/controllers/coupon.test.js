const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, invalidToken, expireToken } = require('../../env.json');
const couponController = require('../../../api/controllers/CouponController');
const {
  couponData,
  missingCouponData,
  checkValidation,
  checkEmptyValidation,
} = require('../envVariable/couponVariables');
const expect = require('chai').expect;

describe('POST /api/coupon/addCouponCode', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/coupon/addCouponCode')
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
      .post('/api/coupon/addCouponCode')
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
      .post('/api/coupon/addCouponCode')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give Validation Error when not pass payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/coupon/addCouponCode')
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
    expect(emptyPayload.body.data).to.have.property('coupon_code');
    expect(emptyPayload.body.data.coupon_code).to.be.an('object');
    expect(emptyPayload.body.data.coupon_code)
      .to.have.property('message')
      .eql('Coupon code is Required');
  });

  it('Should give validation error when not passing product_id in payload.', async () => {
    const missingField = await supertest
      .post('/api/coupon/addCouponCode')
      .set('authorization', token)
      .send(missingCouponData)
      .expect(400);

    expect(missingField.status).eql(400);
    expect(missingField.body).to.be.an('object');
    expect(missingField.body).to.have.property('status').eql('error');
    expect(missingField.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingField.body).to.have.property('data');
    expect(missingField.body.data).to.be.an('object');
    expect(missingField.body.data).to.have.property('product_id');
    expect(missingField.body.data.product_id).to.be.an('object');
    expect(missingField.body.data.product_id)
      .to.have.property('message')
      .eql('Product id is Required');
  });

  it('Should give validation error when condition is number in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/coupon/addCouponCode')
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
    expect(checkPayloadValidation.body.data).to.have.property('condition');
    expect(checkPayloadValidation.body.data.condition).to.be.an('object');
    expect(checkPayloadValidation.body.data.condition)
      .to.have.property('message')
      .eql('Condition should be a type of text');
  });

  it('Should give validation error when coupon_code is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .post('/api/coupon/addCouponCode')
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
    expect(checkEmptyValue.body.data).to.have.property('coupon_code');
    expect(checkEmptyValue.body.data.coupon_code).to.be.an('object');
    expect(checkEmptyValue.body.data.coupon_code)
      .to.have.property('message')
      .eql('Coupon code cannot be an empty field');
  });

  it('Should give success when record is inserted successfully.', async () => {
    sinon.stub(couponController, 'addCouponCode').resolves(200);
    const insertCoupon = await supertest
      .post('/api/coupon/addCouponCode')
      .set('authorization', token)
      .send(couponData)
      .expect(200);

    expect(insertCoupon.status).eql(200);
    expect(insertCoupon.body).to.be.an('object');
    expect(insertCoupon.body).to.have.property('status').eql('success');
    expect(insertCoupon.body)
      .to.have.property('message')
      .eql('Coupon added successfully');
  });
});

describe('GET /api/coupon/listOfCoupon', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/coupon/listOfCoupon')
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
      .get('/api/coupon/listOfCoupon')
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
      .get('/api/coupon/listOfCoupon')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give success when record is get successfully.', async () => {
    sinon.stub(couponController, 'listOfCoupon').resolves(200);
    const getCoupon = await supertest
      .get('/api/coupon/listOfCoupon')
      .set('authorization', token)
      .expect(200);

    expect(getCoupon.status).eql(200);
    expect(getCoupon.body).to.be.an('object');
    expect(getCoupon.body).to.have.property('status').eql('success');
    expect(getCoupon.body)
      .to.have.property('message')
      .eql('List of coupon data');
    expect(getCoupon.body).to.have.property('data');
    expect(getCoupon.body.data).to.be.an('array');
    expect(getCoupon.body.data[0]).to.have.property('id');
    expect(getCoupon.body.data[0]).to.have.property('name');
  });
});
