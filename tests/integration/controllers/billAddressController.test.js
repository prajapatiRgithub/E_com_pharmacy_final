const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
const expect = require('chai').expect;
const billAddressController = require('../../../api/controllers/BillAddressController');
const {
  insertData,
  listOfAddress,
  editData,
  invalidId,
  checkValidation,
  stringInId,
  emptyValidation,
  numberInAddressLine,
} = require('../../integration/envVariable/billAddressVariable');
const { token, invalidToken, expireToken } = require('../../env.json');

describe('POST /api/billAddress/addAddress', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/billAddress/addAddress')
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
      .post('/api/billAddress/addAddress')
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
      .post('/api/billAddress/addAddress')
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
      .post('/api/billAddress/addAddress')
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

  it('Should Give validation error when user_id is string in payload.', async () => {
    const isValidation = await supertest
      .post('/api/billAddress/addAddress')
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

  it('Should Give validation error when address_line_1 is empty in payload.', async () => {
    const isValidation = await supertest
      .post('/api/billAddress/addAddress')
      .set('authorization', token)
      .send(emptyValidation)
      .expect(400);

    expect(isValidation.status).eql(400);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(isValidation.body).to.have.property('data');
    expect(isValidation.body.data).to.be.an('object');
    expect(isValidation.body.data).to.have.property('address_line_1');
    expect(isValidation.body.data.address_line_1).to.be.an('object');
    expect(isValidation.body.data.address_line_1)
      .to.have.property('message')
      .eql('Address line 1 is not allowed to be empty');
  });
});

describe('POST /api/billAddress/viewAddress', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/billAddress/viewAddress')
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
      .post('/api/billAddress/viewAddress')
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
      .post('/api/billAddress/viewAddress')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should Give failed to view address when id is string in payload.', async () => {
    const isValidation = await supertest
      .post('/api/billAddress/viewAddress')
      .set('authorization', token)
      .send(stringInId)
      .expect(500);

    expect(isValidation.status).eql(500);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Failed to view address.');
    expect(isValidation.body).to.have.property('data');
    expect(isValidation.body.data).to.be.an('object');
    expect(isValidation.body.data).to.have.property('cause');
    expect(isValidation.body.data.cause).to.be.an('object');
    expect(isValidation.body.data.cause)
      .to.have.property('name')
      .eql('UsageError');
    expect(isValidation.body.data.cause)
      .to.have.property('code')
      .eql('E_INVALID_CRITERIA');
  });

  it('Should give id not found when user_id is not present in db.', async () => {
    const idValidation = await supertest
      .post('/api/billAddress/viewAddress')
      .set('authorization', token)
      .send(invalidId)
      .expect(200);

    expect(idValidation.status).eql(200);
    expect(idValidation.body).to.be.an('object');
    expect(idValidation.body).to.have.property('status').eql('error');
    expect(idValidation.body).to.have.property('message').eql('Id not found');
  });

  it('Should give address getting successfully when not pass payload.', async () => {
    const viewAddress = await supertest
      .post('/api/billAddress/viewAddress')
      .set('authorization', token)
      .send({})
      .expect(200);

    expect(viewAddress.status).eql(200);
    expect(viewAddress.body).to.be.an('object');
    expect(viewAddress.body).to.have.property('status').eql('success');
    expect(viewAddress.body)
      .to.have.property('message')
      .eql('Address getting successfully');
    expect(viewAddress.body).to.have.property('data');
    expect(viewAddress.body.data).to.be.an('array');
    expect(viewAddress.body.data[0]).to.have.property('id');
    expect(viewAddress.body.data[0]).to.have.property('is_archived');
  });
});

describe('PUT /api/billAddress/editAddress/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/billAddress/editAddress/50')
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
      .put('/api/billAddress/editAddress/50')
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
      .put('/api/billAddress/editAddress/50')
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
    const idValidation = await supertest
      .put('/api/billAddress/editAddress/sasds')
      .set('authorization', token)
      .expect(400);

    expect(idValidation.status).eql(400);
    expect(idValidation.body).to.be.an('object');
    expect(idValidation.body).to.have.property('status').eql('error');
    expect(idValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(idValidation.body).to.have.property('data');
    expect(idValidation.body.data).to.be.an('object');
    expect(idValidation.body.data).to.have.property('id');
    expect(idValidation.body.data.id).to.be.an('object');
    expect(idValidation.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give validation error when address_line_1 is number in payload.', async () => {
    const isValidation = await supertest
      .put('/api/billAddress/editAddress/50')
      .set('authorization', token)
      .send(numberInAddressLine)
      .expect(400);

    expect(isValidation.status).eql(400);
    expect(isValidation.body).to.be.an('object');
    expect(isValidation.body).to.have.property('status').eql('error');
    expect(isValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(isValidation.body).to.have.property('data');
    expect(isValidation.body.data).to.be.an('object');
    expect(isValidation.body.data).to.have.property('address_line_1');
    expect(isValidation.body.data.address_line_1).to.be.an('object');
    expect(isValidation.body.data.address_line_1)
      .to.have.property('message')
      .eql('Address line 1 should be a type of text');
  });

  it('Should give id not found when user_id is not present in db.', async () => {
    const idValidation = await supertest
      .put('/api/billAddress/editAddress/1000')
      .set('authorization', token)
      .expect(200);

    expect(idValidation.status).eql(200);
    expect(idValidation.body).to.be.an('object');
    expect(idValidation.body).to.have.property('status').eql('error');
    expect(idValidation.body).to.have.property('message').eql('Id not found');
  });
});

describe('DELETE /api/billAddress/deleteAddress/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .delete('/api/billAddress/deleteAddress/50')
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
      .delete('/api/billAddress/deleteAddress/50')
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
      .delete('/api/billAddress/deleteAddress/50')
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
    const idValidation = await supertest
      .delete('/api/billAddress/deleteAddress/sasds')
      .set('authorization', token)
      .expect(400);

    expect(idValidation.status).eql(400);
    expect(idValidation.body).to.be.an('object');
    expect(idValidation.body).to.have.property('status').eql('error');
    expect(idValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(idValidation.body).to.have.property('data');
    expect(idValidation.body.data).to.be.an('object');
    expect(idValidation.body.data).to.have.property('id');
    expect(idValidation.body.data.id).to.be.an('object');
    expect(idValidation.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give id not found when user_id is not present in db.', async () => {
    const idValidation = await supertest
      .delete('/api/billAddress/deleteAddress/1000')
      .set('authorization', token)
      .expect(200);

    expect(idValidation.status).eql(200);
    expect(idValidation.body).to.be.an('object');
    expect(idValidation.body).to.have.property('status').eql('error');
    expect(idValidation.body).to.have.property('message').eql('Id not found');
  });
});

describe('POST, GET, DELETE', () => {
  let id = null;
  //addAddress
  it('Should give allows user to add, put, get and delete their billAddress.', async () => {
    sinon.stub(billAddressController, 'addAddress').resolves(200);
    const addWisList = await supertest
      .post('/api/billAddress/addAddress')
      .set('authorization', token)
      .expect(200)
      .send(insertData);

    expect(addWisList.status).eql(200);
    expect(addWisList.body).to.be.an('object');
    expect(addWisList.body).to.have.property('status').eql('success');
    expect(addWisList.body)
      .to.have.property('message')
      .eql('BillAddress added successfully');

    id = addWisList.body.data.id;

    //listOfAddress
    sinon.stub(billAddressController, 'viewAddress').resolves(200);
    const viewAddress = await supertest
      .post(`/api/billAddress/viewAddress`)
      .set('authorization', token)
      .expect(200)
      .send(listOfAddress);

    expect(viewAddress.status).eql(200);
    expect(viewAddress.body).to.be.an('object');
    expect(viewAddress.body).to.have.property('status').eql('success');
    expect(viewAddress.body)
      .to.have.property('message')
      .eql('Address getting successfully');
    expect(viewAddress.body).to.have.property('data');
    expect(viewAddress.body.data).to.be.an('array');
    expect(viewAddress.body.data[0]).to.have.property('id');
    expect(viewAddress.body.data[0]).to.have.property('is_archived');

    //particular viewAddress
    const address = await supertest
      .post(`/api/billAddress/viewAddress`)
      .set('authorization', token)
      .expect(200)
      .send({ id });

    expect(address.status).eql(200);
    expect(address.body).to.be.an('object');
    expect(address.body).to.have.property('status').eql('success');
    expect(address.body)
      .to.have.property('message')
      .eql('Address getting successfully');
    expect(address.body).to.have.property('data');
    expect(address.body.data).to.be.an('array');
    expect(address.body.data[0]).to.have.property('id');
    expect(address.body.data[0]).to.have.property('is_archived');

    //editAddress
    sinon.stub(billAddressController, 'editAddress').resolves(200);
    const editAddress = await supertest
      .put(`/api/billAddress/editAddress/${id}`)
      .set('authorization', token)
      .expect(200)
      .send(editData);

    expect(editAddress.status).eql(200);
    expect(editAddress.body).to.be.an('object');
    expect(editAddress.body).to.have.property('status').eql('success');
    expect(editAddress.body)
      .to.have.property('message')
      .eql('Address updated successfully');

    //deleteAddress
    sinon.stub(billAddressController, 'deleteAddress').resolves(200);
    const deleteWishlist = await supertest
      .delete(`/api/billAddress/deleteAddress/${id}`)
      .set('authorization', token)
      .expect(200);

    expect(deleteWishlist.status).eql(200);
    expect(deleteWishlist.body).to.be.an('object');
    expect(deleteWishlist.body).to.have.property('status').eql('success');
    expect(deleteWishlist.body)
      .to.have.property('message')
      .eql('Address deleted successfully');
  });
});
