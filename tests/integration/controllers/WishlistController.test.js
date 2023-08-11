const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
const expect = require('chai').expect;
const wishListController = require('../../../api/controllers/WishListController');
const {insertData, checkValidation, alreadyRecord} = require('../../integration/envVariable/whishListVariables');
const { token, invalidToken, expireToken } = require('../../env.json');

describe('POST /api/wishlist/addWishlist', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/wishlist/addWishlist')
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
      .post('/api/wishlist/addWishlist')
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
      .post('/api/wishlist/addWishlist')
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
    const isValidation = await supertest
      .post('/api/wishlist/addWishlist')
      .set('authorization', token)
      .send({})
      .expect(400);

    expect(isValidation.status).eql(400);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(isValidation.body).to.have.property('data');
    expect(isValidation.body.data).to.be.an('object');
    expect(isValidation.body.data).to.have.property('user_id');
    expect(isValidation.body.data.user_id).to.be.an('object');
    expect(isValidation.body.data.user_id)
      .to.have.property('message')
      .eql('User id is Required');
  });

  it('Should Give validation error when user_id is number in payload.', async () => {
    const isValidation = await supertest
      .post('/api/wishlist/addWishlist')
      .set('authorization', token)
      .send(checkValidation)
      .expect(400);

    expect(isValidation.status).eql(400);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(isValidation.body).to.have.property('data');
    expect(isValidation.body.data).to.be.an('object');
    expect(isValidation.body.data).to.have.property('user_id');
    expect(isValidation.body.data.user_id).to.be.an('object');
    expect(isValidation.body.data.user_id)
      .to.have.property('message')
      .eql('User id should be a type of number');
  });

  it('Should give your wishList already added when product_id is already present in db.', async () => {
    const isValidation = await supertest
      .post('/api/wishlist/addWishlist')
      .set('authorization', token)
      .send(alreadyRecord)
      .expect(200);

    expect(isValidation.status).eql(200);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Your wishList already added');
  });
});

describe('GET /api/wishlist/viewWishlist/:user_id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/wishlist/viewWishlist/78')
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
      .get('/api/wishlist/viewWishlist/78')
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
      .get('/api/wishlist/viewWishlist/78')
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
    const isValidation = await supertest
      .get('/api/wishlist/viewWishlist/dsfddd')
      .set('authorization', token)
      .expect(400);

    expect(isValidation.status).eql(400);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(isValidation.body).to.have.property('data');
    expect(isValidation.body.data).to.be.an('object');
    expect(isValidation.body.data).to.have.property('user_id');
    expect(isValidation.body.data.user_id).to.be.an('object');
    expect(isValidation.body.data.user_id)
      .to.have.property('message')
      .eql('User id should be a type of number');
  });

  it('Should give id not found when user_id is not in db.', async () => {
    const isIdValidation = await supertest
      .get('/api/wishlist/viewWishlist/2200')
      .set('authorization', token)
      .expect(200);

    expect(isIdValidation.status).eql(200);
    expect(isIdValidation.body).to.be.an('object');
    expect(isIdValidation.body).to.have.property('status').eql('error');
    expect(isIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });
});

describe('DELETE /api/wishlist/deleteWishlist/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .delete('/api/wishlist/deleteWishlist/78')
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
      .delete('/api/wishlist/deleteWishlist/78')
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
      .delete('/api/wishlist/deleteWishlist/78')
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
    const isValidation = await supertest
      .delete('/api/wishlist/deleteWishlist/dsfddd')
      .set('authorization', token)
      .expect(400);

    expect(isValidation.status).eql(400);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(isValidation.body).to.have.property('data');
    expect(isValidation.body.data).to.be.an('object');
    expect(isValidation.body.data).to.have.property('id');
    expect(isValidation.body.data.id).to.be.an('object');
    expect(isValidation.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give id not found when user_id is not in db.', async () => {
    const emptyPayload = await supertest
      .delete('/api/wishlist/deleteWishlist/100')
      .set('authorization', token)
      .expect(200);
      
    expect(emptyPayload.status).eql(200);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('error');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('Id not found');
  });
});

describe('POST, GET, DELETE', () => {
  let id = null;

  it('Should give allows user to add, get and delete their favorite wishlist.', async () => {  
    sinon.stub(wishListController, 'addWishlist').resolves(200);
    const addWisList = await supertest
      .post('/api/wishlist/addWishlist')
      .set('authorization', token)
      .send(insertData)
      .expect(200);

    expect(addWisList.status).eql(200);
    expect(addWisList.body).to.be.an('object');
    expect(addWisList.body).to.have.property('status').eql('success');
    expect(addWisList.body)
      .to.have.property('message')
      .eql('Wishlist added successfully');

    id = addWisList.body.data.id;

    sinon.stub(wishListController, 'viewWishlist').resolves(200);
    const viewWishlist = await supertest
      .get(`/api/wishlist/viewWishlist/${insertData.user_id}`)
      .set('authorization', token)
      .expect(200);

    expect(viewWishlist.status).eql(200);
    expect(viewWishlist.body).to.be.an('object');
    expect(viewWishlist.body).to.have.property('status').eql('success');
    expect(viewWishlist.body)
      .to.have.property('message')
      .eql('Your wishList getting successfully.');
    expect(viewWishlist.body).to.have.property('data');
    expect(viewWishlist.body.data).to.be.an('array');
    expect(viewWishlist.body.data[0]).to.have.property('id');
    expect(viewWishlist.body.data[0]).to.have.property('name');
  
    sinon.stub(wishListController, 'deleteWishlist').resolves(200);
    const deleteWishlist = await supertest
      .delete(`/api/wishlist/deleteWishlist/${id}`)
      .set('authorization', token)
      .expect(200);

    expect(deleteWishlist.status).eql(200);
    expect(deleteWishlist.body).to.be.an('object');
    expect(deleteWishlist.body).to.have.property('status').eql('success');
    expect(deleteWishlist.body)
      .to.have.property('message')
      .eql('Wishlist deleted successfully');
  });
});
