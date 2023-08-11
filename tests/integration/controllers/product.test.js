const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, expireToken } = require('../../env.json');
const productController = require('../../../api/controllers/ProductController');
const expect = require('chai').expect;
const {
  productData,
  insertData,
  checkValidation,
  checkObjectValidation,
  missingProductData,
  updateProductData,
  deleteProductData,
  wrongDeleteProductData,
  ProductImageData,
  checkProductImageData,
  checkEmptyValidation,
  listOfEmptyValidation,
} = require('../envVariable/productVariables');

describe('POST /api/product/addProduct', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/product/addProduct')
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
      .post('/api/product/addProduct')
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
      .post('/api/product/addProduct')
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
    expect(emptyPayload.body.data).to.have.property('is_prescription');
    expect(emptyPayload.body.data.is_prescription).to.be.an('object');
    expect(emptyPayload.body.data.is_prescription)
      .to.have.property('message')
      .eql('Is prescription is Required');
  });

  it('Should give validation error when name is number in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/product/addProduct')
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

  it('Should give validation error when not passing vendor_id in payload.', async () => {
    const missingField = await supertest
      .post('/api/product/addProduct')
      .set('authorization', token)
      .send(missingProductData)
      .expect(400);

    expect(missingField.status).eql(400);
    expect(missingField.body).to.be.an('object');
    expect(missingField.body).to.have.property('status').eql('error');
    expect(missingField.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingField.body).to.have.property('data');
    expect(missingField.body.data).to.be.an('object');
    expect(missingField.body.data).to.have.property('vendor_id');
    expect(missingField.body.data.vendor_id).to.be.an('object');
    expect(missingField.body.data.vendor_id)
      .to.have.property('message')
      .eql('Vendor id is Required');
  });

  it('Should give validation error when name is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .post('/api/product/addProduct')
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

describe('PUT /api/product/editProduct/:product_id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/product/editProduct/1')
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
      .put('/api/product/editProduct/1')
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
    const checkValidationProduct = await supertest
      .put('/api/product/editProduct/1')
      .set('authorization', token)
      .send(checkValidation)
      .expect(400);

    expect(checkValidationProduct.status).eql(400);
    expect(checkValidationProduct.body).to.be.an('object');
    expect(checkValidationProduct.body).to.have.property('status').eql('error');
    expect(checkValidationProduct.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidationProduct.body).to.have.property('data');
    expect(checkValidationProduct.body.data).to.be.an('object');
    expect(checkValidationProduct.body.data).to.have.property('name');
    expect(checkValidationProduct.body.data.name).to.be.an('object');
    expect(checkValidationProduct.body.data.name)
      .to.have.property('message')
      .eql('Name should be a type of text');
  });

  it('Should give id not found when product_id is not present in db.', async () => {
    const checkIdValidation = await supertest
      .put('/api/product/editProduct/1000')
      .set('authorization', token)
      .send(updateProductData)
      .expect(200);

    expect(checkIdValidation.status).eql(200);
    expect(checkIdValidation.body).to.be.an('object');
    expect(checkIdValidation.body).to.have.property('status').eql('error');
    expect(checkIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });

  it('Should give validation error when product_id is string in params.', async () => {
    const failedProduct = await supertest
      .put('/api/product/editProduct/abc')
      .set('authorization', token)
      .expect(400);

    expect(failedProduct.status).eql(400);
    expect(failedProduct.body).to.be.an('object');
    expect(failedProduct.body).to.have.property('status').eql('error');
    expect(failedProduct.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(failedProduct.body).to.have.property('data');
    expect(failedProduct.body.data).to.be.an('object');
    expect(failedProduct.body.data).to.have.property('product_id');
    expect(failedProduct.body.data.product_id).to.be.an('object');
    expect(failedProduct.body.data.product_id)
      .to.have.property('message')
      .eql('Product id should be a type of number');
  });

  it('Should give validation error when name is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .put('/api/product/editProduct/1')
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

describe('DELETE /api/product/deleteProduct/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/product/deleteProduct/1')
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
      .put('/api/product/deleteProduct/1')
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
      .put('/api/product/deleteProduct/abc')
      .set('authorization', token)
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

  it('Should give id not found when id is not present in db.', async () => {
    const passWrongId = await supertest
      .put('/api/product/deleteProduct/1000')
      .set('authorization', token)
      .send(deleteProductData)
      .expect(200);

    expect(passWrongId.status).eql(200);
    expect(passWrongId.body).to.be.an('object');
    expect(passWrongId.body).to.have.property('status').eql('error');
    expect(passWrongId.body).to.have.property('message').eql('Id not found');
  });

  it('Should give validation error when is_archived is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .put('/api/product/deleteProduct/1')
      .set('authorization', token)
      .send(wrongDeleteProductData)
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
      .put('/api/product/deleteProduct/1')
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

describe('POST /api/vendor/productImage', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/vendor/productImage')
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
      .post('/api/vendor/productImage')
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
      .post('/api/vendor/productImage')
      .set('authorization', token)
      .attach({})
      .expect(400);

    expect(emptyPayload.status).eql(400);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('error');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emptyPayload.body).to.have.property('data');
    expect(emptyPayload.body.data).to.be.an('object');
    expect(emptyPayload.body.data).to.have.property('product_id');
    expect(emptyPayload.body.data.product_id).to.be.an('object');
    expect(emptyPayload.body.data.product_id)
      .to.have.property('message')
      .eql('Product id is Required');
  });

  it('Should give validation error when product_id is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/vendor/productImage')
      .set('authorization', token)
      .field(checkProductImageData)
      .attach(
        'image',
        '.tmp/public/images/018c89d1-a498-48bb-9e35-f45dc2d3e6e4.jpg'
      )
      .expect(400);

    expect(checkPayloadValidation.status).eql(400);
    expect(checkPayloadValidation.body).to.be.an('object');
    expect(checkPayloadValidation.body).to.have.property('status').eql('error');
    expect(checkPayloadValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkPayloadValidation.body).to.have.property('data');
    expect(checkPayloadValidation.body.data).to.be.an('object');
    expect(checkPayloadValidation.body.data).to.have.property('product_id');
    expect(checkPayloadValidation.body.data.product_id).to.be.an('object');
    expect(checkPayloadValidation.body.data.product_id)
      .to.have.property('message')
      .eql('Product id should be a type of number');
  });

  it('Should give validation error when not passing product_id in payload.', async () => {
    const missingField = await supertest
      .post('/api/vendor/productImage')
      .set('authorization', token)
      .attach(
        'image',
        '.tmp/public/images/018c89d1-a498-48bb-9e35-f45dc2d3e6e4.jpg'
      )
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
});

describe('GET /api/product/viewProduct/:product_id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/product/viewProduct/1')
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
      .get('/api/product/viewProduct/1')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when product_id is string in params.', async () => {
    const failedProduct = await supertest
      .get('/api/product/viewProduct/abc')
      .set('authorization', token)
      .expect(400);

    expect(failedProduct.status).eql(400);
    expect(failedProduct.body).to.be.an('object');
    expect(failedProduct.body).to.have.property('status').eql('error');
    expect(failedProduct.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(failedProduct.body).to.have.property('data');
    expect(failedProduct.body.data).to.be.an('object');
    expect(failedProduct.body.data).to.have.property('product_id');
    expect(failedProduct.body.data.product_id).to.be.an('object');
    expect(failedProduct.body.data.product_id)
      .to.have.property('message')
      .eql('Product id should be a type of number');
  });
});

describe('POST /api/product/listOfProducts', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/product/listOfProducts')
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
      .post('/api/product/listOfProducts')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when sort is array in payload.', async () => {
    const checkValidation = await supertest
      .post('/api/product/listOfProducts')
      .set('authorization', token)
      .send(checkObjectValidation)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('sort');
    expect(checkValidation.body.data.sort).to.be.an('object');
    expect(checkValidation.body.data.sort)
      .to.have.property('message')
      .eql('Sort should be a type of object');
  });

  it('Should give validation error when sort is empty in payload.', async () => {
    const checkEmptyValue = await supertest
      .post('/api/product/listOfProducts')
      .set('authorization', token)
      .send(listOfEmptyValidation)
      .expect(400);

    expect(checkEmptyValue.status).eql(400);
    expect(checkEmptyValue.body).to.be.an('object');
    expect(checkEmptyValue.body).to.have.property('status').eql('error');
    expect(checkEmptyValue.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkEmptyValue.body).to.have.property('data');
    expect(checkEmptyValue.body.data).to.be.an('object');
    expect(checkEmptyValue.body.data).to.have.property('sort');
    expect(checkEmptyValue.body.data.sort).to.be.an('object');
    expect(checkEmptyValue.body.data.sort)
      .to.have.property('message')
      .eql('Sort cannot be empty');
  });
});

describe('POST, PUT, GET, DELETE', () => {
  let id = null;
  it('Should allows user to add, update, get and delete their favorite product.', async () => {
    sinon.stub(productController, 'addProduct').resolves(200);
    const insertProduct = await supertest
      .post('/api/product/addProduct')
      .set('authorization', token)
      .send(productData)
      .expect(200);

    expect(insertProduct.status).eql(200);
    expect(insertProduct.body).to.be.an('object');
    expect(insertProduct.body).to.have.property('status').eql('success');
    expect(insertProduct.body)
      .to.have.property('message')
      .eql('Product added successfully');

    id = insertProduct.body.data.id;

    sinon.stub(productController, 'editProduct').resolves(200);
    const updateProduct = await supertest
      .put(`/api/product/editProduct/${insertData.product_id}`)
      .set('authorization', token)
      .send(updateProductData)
      .expect(200);

    expect(updateProduct.status).eql(200);
    expect(updateProduct.body).to.be.an('object');
    expect(updateProduct.body).to.have.property('status').eql('success');
    expect(updateProduct.body)
      .to.have.property('message')
      .eql('Product is updated successfully.');

    sinon.stub(productController, 'deleteProduct').resolves(200);
    const deleteProduct = await supertest
      .put(`/api/product/deleteProduct/${id}`)
      .set('authorization', token)
      .send(deleteProductData)
      .expect(200);

    expect(deleteProduct.status).eql(200);
    expect(deleteProduct.body).to.be.an('object');
    expect(deleteProduct.body).to.have.property('status').eql('success');
    expect(deleteProduct.body)
      .to.have.property('message')
      .eql('Product deleted successfully');

    sinon.stub(productController, 'productImage').resolves(200);
    const insertProductImage = await supertest
      .post('/api/vendor/productImage')
      .set('authorization', token)
      .field(ProductImageData)
      .attach(
        'image',
        '.tmp/public/images/018c89d1-a498-48bb-9e35-f45dc2d3e6e4.jpg'
      )
      .expect(200);

    expect(insertProductImage.status).eql(200);
    expect(insertProductImage.body).to.be.an('object');
    expect(insertProductImage.body).to.have.property('status').eql('success');
    expect(insertProductImage.body)
      .to.have.property('message')
      .eql('Image added successfully');

    sinon.stub(productController, 'listOfProducts').resolves(200);
    const listOfProductData = await supertest
      .post('/api/product/listOfProducts')
      .set('authorization', token)
      .expect(200);

    expect(listOfProductData.status).eql(200);
    expect(listOfProductData.body).to.be.an('object');
    expect(listOfProductData.body).to.have.property('status').eql('success');
    expect(listOfProductData.body).to.have.property('data');
    expect(listOfProductData.body.data).to.be.an('array');
    expect(listOfProductData.body.data[0]).to.have.property('image');
    expect(listOfProductData.body.data[0]).to.have.property('is_prescription');

    sinon.stub(productController, 'viewProduct').resolves(200);
    const getProductDetails = await supertest
      .get(`/api/product/viewProduct/${insertData.product_id}`)
      .set('authorization', token)
      .expect(200);

    expect(getProductDetails.status).eql(200);
    expect(getProductDetails.body).to.be.an('object');
    expect(getProductDetails.body).to.have.property('status').eql('success');
    expect(getProductDetails.body).to.have.property('data');
    expect(getProductDetails.body.data).to.be.an('array');
    expect(getProductDetails.body.data[0]).to.have.property('image');
    expect(getProductDetails.body.data[0]).to.have.property('id');
  });
});
