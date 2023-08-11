const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
const expect = require('chai').expect;
const orderController = require('../../../api/controllers/OrderController');
const {
  orderDetails,
  stringInUserId,
  stringInProductId,
  emptyProductId,
  flagValidation,
  invalidId,
  stringFlagValidation,
  invalidOrderStatusId,
} = require('../../integration/envVariable/orderVariable');
const { token, invalidToken, expireToken } = require('../../env.json');

describe('POST /api/order/checkout', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/order/checkout')
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
      .post('/api/order/checkout')
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
      .post('/api/order/checkout')
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
      .post('/api/order/checkout')
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
      .eql('User id is a Required');
  });

  it('Should give validation error when user_id is string payload.', async () => {
    const invalidData = await supertest
      .post('/api/order/checkout')
      .set('authorization', token)
      .send(stringInUserId)
      .expect(400);

    expect(invalidData.status).eql(400);
    expect(invalidData.body).to.be.an('object');
    expect(invalidData.body).to.have.property('status').eql('error');
    expect(invalidData.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidData.body).to.have.property('data');
    expect(invalidData.body.data).to.be.an('object');
    expect(invalidData.body.data).to.have.property('user_id');
    expect(invalidData.body.data.user_id).to.be.an('object');
    expect(invalidData.body.data.user_id)
      .to.have.property('message')
      .eql('User id should be a type of number');
  });

  it('Should give validation error when product_id is string payload.', async () => {
    const stringValidation = await supertest
      .post('/api/order/checkout')
      .set('authorization', token)
      .send(stringInProductId)
      .expect(400);

    expect(stringValidation.status).eql(400);
    expect(stringValidation.body).to.be.an('object');
    expect(stringValidation.body).to.have.property('status').eql('error');
    expect(stringValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(stringValidation.body).to.have.property('data');
    expect(stringValidation.body.data).to.be.an('object');
    expect(stringValidation.body.data).to.have.property('product_id');
    expect(stringValidation.body.data.product_id).to.be.an('object');
    expect(stringValidation.body.data.product_id)
      .to.have.property('message')
      .eql('Product id should be a type of array');
  });

  it('Should give validation error when product_id is empty in payload.', async () => {
    const emptyValidation = await supertest
      .post('/api/order/checkout')
      .set('authorization', token)
      .send(emptyProductId)
      .expect(400);

    expect(emptyValidation.status).eql(400);
    expect(emptyValidation.body).to.be.an('object');
    expect(emptyValidation.body).to.have.property('status').eql('error');
    expect(emptyValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emptyValidation.body).to.have.property('data');
    expect(emptyValidation.body.data).to.be.an('object');
    expect(emptyValidation.body.data).to.have.property('product_id');
    expect(emptyValidation.body.data.product_id).to.be.an('object');
    expect(emptyValidation.body.data.product_id)
      .to.have.property('message')
      .eql('Product id cannot be an empty field');
  });
});

describe('GET /api/order/orderHistory/:user_id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/order/orderHistory/78')
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
      .get('/api/order/orderHistory/78')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when user_id is string in params.', async () => {
    const invalidId = await supertest
      .get('/api/order/orderHistory/dfsd')
      .set('authorization', token)
      .expect(400);

    expect(invalidId.status).eql(400);
    expect(invalidId.body).to.be.an('object');
    expect(invalidId.body).to.have.property('status').eql('error');
    expect(invalidId.body).to.have.property('message').eql('Validation Error');
    expect(invalidId.body).to.have.property('data');
    expect(invalidId.body.data).to.be.an('object');
    expect(invalidId.body.data).to.have.property('user_id');
    expect(invalidId.body.data.user_id).to.be.an('object');
    expect(invalidId.body.data.user_id)
      .to.have.property('message')
      .eql('User id should be a type of number');
  });

  it('Should give id not found when id is not present in db.', async () => {
    const notFoundId = await supertest
      .get('/api/order/orderHistory/1000')
      .set('authorization', token)
      .expect(200);

    expect(notFoundId.status).eql(200);
    expect(notFoundId.body).to.be.an('object');
    expect(notFoundId.body).to.have.property('status').eql('error');
    expect(notFoundId.body).to.have.property('message').eql('Id not found');
  });
});

describe('PUT /api/order/cancelOrder', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/order/cancelOrder')
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
      .put('/api/order/cancelOrder')
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
      .put('/api/order/cancelOrder')
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
      .put('/api/order/cancelOrder')
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
    expect(emptyPayload.body.data).to.have.property('id');
    expect(emptyPayload.body.data.id).to.be.an('object');
    expect(emptyPayload.body.data.id)
      .to.have.property('message')
      .eql('Id is a Required');
  });

  it('Should give validation error when flag is string in payload', async () => {
    const stringInPayload = await supertest
      .put('/api/order/cancelOrder')
      .set('authorization', token)
      .send(flagValidation)
      .expect(400);

    expect(stringInPayload.status).eql(400);
    expect(stringInPayload.body).to.be.an('object');
    expect(stringInPayload.body).to.have.property('status').eql('error');
    expect(stringInPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(stringInPayload.body).to.have.property('data');
    expect(stringInPayload.body.data).to.be.an('object');
    expect(stringInPayload.body.data).to.have.property('flag');
    expect(stringInPayload.body.data.flag).to.be.an('object');
    expect(stringInPayload.body.data.flag)
      .to.have.property('message')
      .eql('Flag should be a type of boolean');
  });

  it('Should give order not canceled when id is not present in db.', async () => {
    const orderNotCancel = await supertest
      .put('/api/order/cancelOrder')
      .set('authorization', token)
      .send(invalidId)
      .expect(404);

    expect(orderNotCancel.status).eql(404);
    expect(orderNotCancel.body).to.be.an('object');
    expect(orderNotCancel.body).to.have.property('status').eql('error');
    expect(orderNotCancel.body)
      .to.have.property('message')
      .eql('Order not canceled');
  });
});

describe('PUT /api/order/orderStatus', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/order/orderStatus')
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
      .put('/api/order/orderStatus')
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
      .put('/api/order/orderStatus')
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
      .put('/api/order/orderStatus')
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
    expect(emptyPayload.body.data).to.have.property('id');
    expect(emptyPayload.body.data.id).to.be.an('object');
    expect(emptyPayload.body.data.id)
      .to.have.property('message')
      .eql('Id is a Required');
  });

  it('Should give validation error when flag is string in payload', async () => {
    const stringInPayload = await supertest
      .put('/api/order/orderStatus')
      .set('authorization', token)
      .send(stringFlagValidation)
      .expect(400);

    expect(stringInPayload.status).eql(400);
    expect(stringInPayload.body).to.be.an('object');
    expect(stringInPayload.body).to.have.property('status').eql('error');
    expect(stringInPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(stringInPayload.body).to.have.property('data');
    expect(stringInPayload.body.data).to.be.an('object');
    expect(stringInPayload.body.data).to.have.property('flag');
    expect(stringInPayload.body.data.flag).to.be.an('object');
    expect(stringInPayload.body.data.flag)
      .to.have.property('message')
      .eql('Flag should be a type of number');
  });

  it('Should give id not found when id is not present in db.', async () => {
    const invalidId = await supertest
      .put('/api/order/orderStatus')
      .set('authorization', token)
      .send(invalidOrderStatusId)
      .expect(200);

    expect(invalidId.status).eql(200);
    expect(invalidId.body).to.be.an('object');
    expect(invalidId.body).to.have.property('status').eql('error');
    expect(invalidId.body).to.have.property('message').eql('Id not found');
  });
});

describe('GET /api/order/viewOrder/:order_id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/order/viewOrder/139')
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
      .get('/api/order/viewOrder/139')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when order_id is string in params.', async () => {
    const invalidId = await supertest
      .get('/api/order/viewOrder/sdsf')
      .set('authorization', token)
      .expect(400);

    expect(invalidId.status).eql(400);
    expect(invalidId.body).to.be.an('object');
    expect(invalidId.body).to.have.property('status').eql('error');
    expect(invalidId.body).to.have.property('message').eql('Validation Error');
    expect(invalidId.body).to.have.property('data');
    expect(invalidId.body.data).to.be.an('object');
    expect(invalidId.body.data).to.have.property('order_id');
    expect(invalidId.body.data.order_id).to.be.an('object');
    expect(invalidId.body.data.order_id)
      .to.have.property('message')
      .eql('Order id should be a type of number');
  });

  it('Should give id not found when order id is not in db.', async () => {
    const notFoundOrderId = await supertest
      .get('/api/order/viewOrder/1000')
      .set('authorization', token)
      .expect(200);

    expect(notFoundOrderId.status).eql(200);
    expect(notFoundOrderId.body).to.be.an('object');
    expect(notFoundOrderId.body).to.have.property('status').eql('error');
    expect(notFoundOrderId.body)
      .to.have.property('message')
      .eql('Id not found');
  });
});

describe('POST, PUT, GET, DELETE', () => {
  let id = null;
  it('Should allows user to add, get, put, delete their order.', async () => {
    //checkOut
    sinon.stub(orderController, 'checkOut').resolves(200);
    const checkOut = await supertest
      .post('/api/order/checkout')
      .set('authorization', token)
      .send(orderDetails)
      .expect(200);

    expect(checkOut.status).eql(200);
    expect(checkOut.body).to.be.an('object');
    expect(checkOut.body).to.have.property('status').eql('success');
    expect(checkOut.body)
      .to.have.property('message')
      .eql('Order placed successfully');
    expect(checkOut.body).to.have.property('data');
    expect(checkOut.body.data).to.be.an('object');
    expect(checkOut.body.data).to.have.property('user_id');
    expect(checkOut.body.data).to.have.property('tax');

    id = checkOut.body.data.id;

    //orderHistory
    sinon.stub(orderController, 'orderHistory').resolves(200);
    const orderHistory = await supertest
      .get(`/api/order/orderHistory/${checkOut.body.data.user_id}`)
      .set('authorization', token)
      .expect(200);

    expect(orderHistory.status).eql(200);
    expect(orderHistory.body).to.be.an('object');
    expect(orderHistory.body).to.have.property('status').eql('success');
    expect(orderHistory.body).to.have.property('message').eql('');
    expect(orderHistory.body).to.have.property('data');
    expect(orderHistory.body.data).to.be.an('array');
    expect(orderHistory.body.data[0]).to.have.property('id');
    expect(orderHistory.body.data[0]).to.have.property('is_archived');

    //orderStatus;
    sinon.stub(orderController, 'orderStatus').resolves(200);
    const orderStatus = await supertest
      .put('/api/order/orderStatus')
      .set('authorization', token)
      .send({
        id,
        flag: 1,
      })
      .expect(200);

    expect(orderStatus.status).eql(200);
    expect(orderStatus.body).to.be.an('object');
    expect(orderStatus.body).to.have.property('status').eql('success');
    expect(orderStatus.body)
      .to.have.property('message')
      .eql('Order Status updated successfully');

    //viewOrder
    sinon.stub(orderController, 'viewOrder').resolves(200);
    const viewOrder = await supertest
      .get(`/api/order/viewOrder/${id}`)
      .set('authorization', token)
      .expect(200);

    expect(viewOrder.status).eql(200);
    expect(viewOrder.body).to.be.an('object');
    expect(viewOrder.body).to.have.property('status').eql('success');
    expect(viewOrder.body).to.have.property('message').eql('');
    expect(viewOrder.body).to.have.property('data');
    expect(viewOrder.body.data).to.be.an('object');
    expect(viewOrder.body.data).to.have.property('detailsOfOrder');
    expect(viewOrder.body.data).to.have.property('productDetails');

    //cancelOrder
    sinon.stub(orderController, 'cancelOrder').resolves(200);
    const deleteOrder = await supertest
      .put('/api/order/cancelOrder')
      .set('authorization', token)
      .send({
        id,
        flag: true,
      })
      .expect(200);

    expect(deleteOrder.status).eql(200);
    expect(orderHistory.body).to.be.an('object');
    expect(deleteOrder.body).to.have.property('status').eql('success');
    expect(deleteOrder.body)
      .to.have.property('message')
      .eql('Order deleted successfully');
  });
});