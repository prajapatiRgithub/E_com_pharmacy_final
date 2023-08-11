const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, invalidToken, expireToken } = require('../../env.json');
const cartController = require('../../../api/controllers/CartController');
const {
  insertData,
  cartData,
  checkValidationAddToCart,
  missingCartData,
  cartUpdateData,
  wrongUpdateData,
} = require('../envVariable/cartVariables');
const expect = require('chai').expect;

describe('POST /api/cart/addToCart', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/cart/addToCart')
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
      .post('/api/cart/addToCart')
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
      .post('/api/cart/addToCart')
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
      .post('/api/cart/addToCart')
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

  it('Should give validation error when not passing product_id in payload.', async () => {
    const missingField = await supertest
      .post('/api/cart/addToCart')
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
    expect(missingField.body.data).to.have.property('product_id');
    expect(missingField.body.data.product_id).to.be.an('object');
    expect(missingField.body.data.product_id)
      .to.have.property('message')
      .eql('Product id is Required');
  });

  it('Should give validation error when user_id is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/cart/addToCart')
      .set('authorization', token)
      .send(checkValidationAddToCart)
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
});

describe('PUT /api/cart/editCart/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/cart/editCart/1')
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
      .put('/api/cart/editCart/1')
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
      .put('/api/cart/editCart/1')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give id not found when id not present in db.', async () => {
    const checkIdValidation = await supertest
      .put('/api/cart/editCart/1000')
      .set('authorization', token)
      .send(cartUpdateData)
      .expect(200);

    expect(checkIdValidation.status).eql(200);
    expect(checkIdValidation.body).to.be.an('object');
    expect(checkIdValidation.body).to.have.property('status').eql('error');
    expect(checkIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });

  it('Should give validation error when id is string in params.', async () => {
    const failedCart = await supertest
      .put('/api/cart/editCart/abc')
      .set('authorization', token)
      .expect(400);

    expect(failedCart.status).eql(400);
    expect(failedCart.body).to.be.an('object');
    expect(failedCart.body).to.have.property('status').eql('error');
    expect(failedCart.body).to.have.property('message').eql('Validation Error');
    expect(failedCart.body).to.have.property('data');
    expect(failedCart.body.data).to.be.an('object');
    expect(failedCart.body.data).to.have.property('id');
    expect(failedCart.body.data.id).to.be.an('object');
    expect(failedCart.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give validation error when quantity is string in payload.', async () => {
    const checkValidation = await supertest
      .put('/api/cart/editCart/3')
      .set('authorization', token)
      .send(wrongUpdateData)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('quantity');
    expect(checkValidation.body.data.quantity).to.be.an('object');
    expect(checkValidation.body.data.quantity)
      .to.have.property('message')
      .eql('Quantity should be a type of number');
  });
});

describe('GET /api/cart/viewCart/:user_id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/cart/viewCart/1')
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
      .get('/api/cart/viewCart/1')
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
      .get('/api/cart/viewCart/1')
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
    const failedCart = await supertest
      .get('/api/cart/viewCart/abc')
      .set('authorization', token)
      .expect(400);

    expect(failedCart.status).eql(400);
    expect(failedCart.body).to.be.an('object');
    expect(failedCart.body).to.have.property('status').eql('error');
    expect(failedCart.body).to.have.property('message').eql('Validation Error');
    expect(failedCart.body).to.have.property('data');
    expect(failedCart.body.data).to.be.an('object');
    expect(failedCart.body.data).to.have.property('user_id');
    expect(failedCart.body.data.user_id).to.be.an('object');
    expect(failedCart.body.data.user_id)
      .to.have.property('message')
      .eql('User id should be a type of number');
  });

  it('Should give id not found when id not present in db.', async () => {
    const checkIdValidation = await supertest
      .get('/api/cart/viewCart/1000')
      .set('authorization', token)
      .expect(200);

    expect(checkIdValidation.status).eql(200);
    expect(checkIdValidation.body).to.be.an('object');
    expect(checkIdValidation.body).to.have.property('status').eql('error');
    expect(checkIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });
});

describe('DELETE /api/cart/deleteCart/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .delete('/api/cart/deleteCart/1')
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
      .delete('/api/cart/deleteCart/1')
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
      .delete('/api/cart/deleteCart/1')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when id is string in params.', async () => {
    const failedCart = await supertest
      .delete('/api/cart/deleteCart/abc')
      .set('authorization', token)
      .expect(400);

    expect(failedCart.status).eql(400);
    expect(failedCart.body).to.be.an('object');
    expect(failedCart.body).to.have.property('status').eql('error');
    expect(failedCart.body).to.have.property('message').eql('Validation Error');
    expect(failedCart.body).to.have.property('data');
    expect(failedCart.body.data).to.be.an('object');
    expect(failedCart.body.data).to.have.property('id');
    expect(failedCart.body.data.id).to.be.an('object');
    expect(failedCart.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give id not found when id not present in db.', async () => {
    const checkIdValidation = await supertest
      .delete('/api/cart/deleteCart/1000')
      .set('authorization', token)
      .expect(200);

    expect(checkIdValidation.status).eql(200);
    expect(checkIdValidation.body).to.be.an('object');
    expect(checkIdValidation.body).to.have.property('status').eql('error');
    expect(checkIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });
});

describe('POST, PUT, GET, DELETE', () => {
  let id = null;
  it('Should allows user to add, update, get and delete their favorite cart.', async () => {
    sinon.stub(cartController, 'addToCart').resolves(200);
    const insertCart = await supertest
      .post('/api/cart/addToCart')
      .set('authorization', token)
      .send(cartData)
      .expect(200);

    expect(insertCart.status).eql(200);
    expect(insertCart.body).to.be.an('object');
    expect(insertCart.body).to.have.property('status').eql('success');
    expect(insertCart.body)
      .to.have.property('message')
      .eql('Cart added successfully');

    id = insertCart.body.data.id;

    sinon.stub(cartController, 'editCart').resolves(200);
    const updateCart = await supertest
      .put(`/api/cart/editCart/${id}`)
      .set('authorization', token)
      .send(cartUpdateData)
      .expect(200);

    expect(updateCart.status).eql(200);
    expect(updateCart.body).to.be.an('object');
    expect(updateCart.body).to.have.property('status').eql('success');
    expect(updateCart.body)
      .to.have.property('message')
      .eql('Cart is updated successfully.');

    sinon.stub(cartController, 'viewCart').resolves(200);
    const getCart = await supertest
      .get(`/api/cart/viewCart/${insertData.user_id}`)
      .set('authorization', token)
      .expect(200);

    expect(getCart.status).eql(200);
    expect(getCart.body).to.be.an('object');
    expect(getCart.body).to.have.property('status').eql('success');
    expect(getCart.body)
      .to.have.property('message')
      .eql('Your cart getting successfully');
    expect(getCart.body).to.have.property('data');
    expect(getCart.body.data).to.be.an('object');
    expect(getCart.body.data).to.have.property('product_id');
    expect(getCart.body.data.product_id).to.be.an('array');
    expect(getCart.body.data.product_id[0]).to.have.property('id');
    expect(getCart.body.data.product_id[0]).to.have.property('description');

    sinon.stub(cartController, 'deleteCart').resolves(200);
    const deleteCart = await supertest
      .delete(`/api/cart/deleteCart/${id}`)
      .set('authorization', token)
      .expect(200);

    expect(deleteCart.status).eql(200);
    expect(deleteCart.body).to.be.an('object');
    expect(deleteCart.body).to.have.property('status').eql('success');
    expect(deleteCart.body)
      .to.have.property('message')
      .eql('Cart deleted successfully');
  });
});
