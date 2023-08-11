const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, expireToken } = require('../../env.json');
const categoryController = require('../../../api/controllers/CategoryController');
const expect = require('chai').expect;
const {
  categoryData,
  checkValidation,
  missingCategoryData,
  updateCategoryData,
  deleteCategoryData,
  wrongDeleteCategoryData,
  checkEmptyValidation
} = require('../envVariable/categoryVariables');

describe('POST /api/category/addCategory', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/category/addCategory')
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
      .post('/api/category/addCategory')
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
      .post('/api/category/addCategory')
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
    expect(emptyPayload.body.data).to.have.property('name');
    expect(emptyPayload.body.data.name).to.be.an('object');
    expect(emptyPayload.body.data.name)
      .to.have.property('message')
      .eql('Name is Required');
  });

  it('Should give validation error when name is number in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/category/addCategory')
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
    expect(checkPayloadValidation.body.data).to.have.property('name');
    expect(checkPayloadValidation.body.data.name).to.be.an('object');
    expect(checkPayloadValidation.body.data.name)
      .to.have.property('message')
      .eql('Name should be a type of text');
  });

  it('Should give validation error when not passing name in payload.', async () => {
    const missingField = await supertest
      .post('/api/category/addCategory')
      .set('authorization', token)
      .send(missingCategoryData)
      .expect(400);

    expect(missingField.status).eql(400);
    expect(missingField.body).to.be.an('object');
    expect(missingField.body).to.have.property('status').eql('error');
    expect(missingField.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingField.body).to.have.property('data');
    expect(missingField.body.data).to.be.an('object');
    expect(missingField.body.data).to.have.property('name');
    expect(missingField.body.data.name).to.be.an('object');
    expect(missingField.body.data.name)
      .to.have.property('message')
      .eql('Name is Required');
  });

  it('Should give validation error when name is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .post('/api/category/addCategory')
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
    expect(checkEmptyValue.body.data).to.have.property('name');
    expect(checkEmptyValue.body.data.name).to.be.an('object');
    expect(checkEmptyValue.body.data.name)
      .to.have.property('message')
      .eql('Name cannot be an empty field');
  });
});

describe('PUT /api/category/editCategory/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/category/editCategory/1')
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
      .put('/api/category/editCategory/1')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when name is number in payload.', async () => {
    const checkValidationCategory = await supertest
      .put('/api/category/editCategory/1')
      .set('authorization', token)
      .send(checkValidation)
      .expect(400);

    expect(checkValidationCategory.status).eql(400);
    expect(checkValidationCategory.body).to.be.an('object');
    expect(checkValidationCategory.body)
      .to.have.property('status')
      .eql('error');
    expect(checkValidationCategory.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidationCategory.body).to.have.property('data');
    expect(checkValidationCategory.body.data).to.be.an('object');
    expect(checkValidationCategory.body.data).to.have.property('name');
    expect(checkValidationCategory.body.data.name).to.be.an('object');
    expect(checkValidationCategory.body.data.name)
      .to.have.property('message')
      .eql('Name should be a type of text');
  });

  it('Should give id not found when id not present in db.', async () => {
    const checkIdValidation = await supertest
      .put('/api/category/editCategory/1000')
      .set('authorization', token)
      .send(updateCategoryData)
      .expect(200);

    expect(checkIdValidation.status).eql(200);
    expect(checkIdValidation.body).to.be.an('object');
    expect(checkIdValidation.body).to.have.property('status').eql('error');
    expect(checkIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });

  it('Should give validation error when id is string in params.', async () => {
    const failedCategory = await supertest
      .put('/api/category/editCategory/abc')
      .set('authorization', token)
      .send(updateCategoryData)
      .expect(400);

    expect(failedCategory.status).eql(400);
    expect(failedCategory.body).to.be.an('object');
    expect(failedCategory.body).to.have.property('status').eql('error');
    expect(failedCategory.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(failedCategory.body).to.have.property('data');
    expect(failedCategory.body.data).to.be.an('object');
    expect(failedCategory.body.data).to.have.property('id');
    expect(failedCategory.body.data.id).to.be.an('object');
    expect(failedCategory.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give validation error when name is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .put('/api/category/editCategory/1')
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
    expect(checkEmptyValue.body.data).to.have.property('name');
    expect(checkEmptyValue.body.data.name).to.be.an('object');
    expect(checkEmptyValue.body.data.name)
      .to.have.property('message')
      .eql('Name cannot be an empty field');
  });
});

describe('DELETE /api/category/deleteCategory/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/category/deleteCategory/1')
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
      .put('/api/category/deleteCategory/1')
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
    const checkValidation = await supertest
      .put('/api/category/deleteCategory/abc')
      .set('authorization', token)
      .send(deleteCategoryData)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('id');
    expect(checkValidation.body.data.id).to.be.an('object');
    expect(checkValidation.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give id not found when id not present in db.', async () => {
    const passWrongId = await supertest
      .put('/api/category/deleteCategory/10000')
      .set('authorization', token)
      .send(deleteCategoryData)
      .expect(200);

    expect(passWrongId.status).eql(200);
    expect(passWrongId.body).to.be.an('object');
    expect(passWrongId.body).to.have.property('status').eql('error');
    expect(passWrongId.body).to.have.property('message').eql('Id not found');
  });

  it('Should give validation error when is_archived is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .put('/api/category/deleteCategory/1')
      .set('authorization', token)
      .send(wrongDeleteCategoryData)
      .expect(400);

    expect(checkPayloadValidation.status).eql(400);
    expect(checkPayloadValidation.body).to.be.an('object');
    expect(checkPayloadValidation.body).to.have.property('status').eql('error');
    expect(checkPayloadValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkPayloadValidation.body).to.have.property('data');
    expect(checkPayloadValidation.body.data).to.be.an('object');
    expect(checkPayloadValidation.body.data).to.have.property('is_archived');
    expect(checkPayloadValidation.body.data.is_archived).to.be.an('object');
    expect(checkPayloadValidation.body.data.is_archived)
      .to.have.property('message')
      .eql('Is archived should be a type of boolean');
  });

  it('Should give validation error when not pass payload.', async () => {
    const emptyPayload = await supertest
      .put('/api/category/deleteCategory/1')
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
    expect(emptyPayload.body.data).to.have.property('is_archived');
    expect(emptyPayload.body.data.is_archived).to.be.an('object');
    expect(emptyPayload.body.data.is_archived)
      .to.have.property('message')
      .eql('Is archived is Required');
  });
});

describe('POST, PUT, GET, DELETE', () => {
  let id = null;
  it('Should allows user to add, update, get and delete their favorite category.', async () => {
    sinon.stub(categoryController, 'addCategory').resolves(200);
    const insertCategory = await supertest
      .post('/api/category/addCategory')
      .set('authorization', token)
      .send(categoryData)
      .expect(200);

    expect(insertCategory.status).eql(200);
    expect(insertCategory.body).to.be.an('object');
    expect(insertCategory.body).to.have.property('status').eql('success');
    expect(insertCategory.body)
      .to.have.property('message')
      .eql('Category added successfully');

    id = insertCategory.body.data.id;

    sinon.stub(categoryController, 'editCategory').resolves(200);
    const updateCategory = await supertest
      .put(`/api/category/editCategory/${id}`)
      .set('authorization', token)
      .send(updateCategoryData)
      .expect(200);

    expect(updateCategory.status).eql(200);
    expect(updateCategory.body).to.be.an('object');
    expect(updateCategory.body).to.have.property('status').eql('success');
    expect(updateCategory.body)
      .to.have.property('message')
      .eql('Category is updated successfully.');

    sinon.stub(categoryController, 'deleteCategory').resolves(200);
    const deleteCategory = await supertest
      .put(`/api/category/deleteCategory/${id}`)
      .set('authorization', token)
      .send(deleteCategoryData)
      .expect(200);

    expect(deleteCategory.status).eql(200);
    expect(deleteCategory.body).to.be.an('object');
    expect(deleteCategory.body).to.have.property('status').eql('success');
    expect(deleteCategory.body)
      .to.have.property('message')
      .eql('Category deleted successfully');
  });
});
