const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, expireToken } = require('../../env.json');
const reportController = require('../../../api/controllers/ReportController');
const expect = require('chai').expect;
const {
  purchasedProductsData,
  checkObjectValidation,
  wrongPurchasedProductsData,
  dataNotPresent,
  checkValidation,
  checkDateValidation,
  vendorReportData,
  checkVendorReportValidation,
  vendorReportDataNotPresent,
  checkVendorReportObjectValidation,
  checkVendorReportDateValidation,
  wrongVendorReportData,
  salesData,
  checkSalesReportObjectValidation,
  checkSalesReportValidation,
  checkSalesDateValidation,
  wrongSalesData,
  salesReportDataNotPresent,
  purchasedProductsReportNotPassLimit,
  purchasedProductsReportStartDateNull,
  purchasedProductsReportEndDateNull,
  passPurchasedProductsReportDateNull,
  vendorReportStartDateNull,
  vendorReportEndDateNull,
  passVendorReportDateNull,
  vendorReportNotPassLimit,
  salesReportStartDateNull,
  salesReportEndDateNull,
  passSalesReportDateNull,
  salesReportNotPassLimit,
  checkCustomerValidation,
  sortValidation,
  nameValidation,
  validCustomerTransaction,
  invalidCustomerTransaction,
  validCustomer,
  stringSortValidation,
  nullValidation,
  limitValidation,
  validCustomerOrderData,
  startDateDetails,
  endDateDetails
} = require('../envVariable/reportVariables');

describe('POST /api/admin/purchasedProducts', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/admin/purchasedProducts')
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
      .post('/api/admin/purchasedProducts')
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
      .post('/api/admin/purchasedProducts')
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

  it('Should give validation error when limit is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/admin/purchasedProducts')
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
    expect(checkPayloadValidation.body.data).to.have.property('limit');
    expect(checkPayloadValidation.body.data.limit).to.be.an('object');
    expect(checkPayloadValidation.body.data.limit)
      .to.have.property('message')
      .eql('Limit should be a type of number');
  });

  it('Should give validation error when pass wrong start date format in payload.', async () => {
    const checkValidation = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(checkDateValidation)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('startDate');
    expect(checkValidation.body.data.startDate).to.be.an('object');
    expect(checkValidation.body.data.startDate)
      .to.have.property('message')
      .eql('Start date format not valid');
  });

  it('Should give error when pass wrong sort value in payload.', async () => {
    const wrongPassPayload = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(wrongPurchasedProductsData)
      .expect(500);

    expect(wrongPassPayload.status).eql(500);
    expect(wrongPassPayload.body).to.be.an('object');
    expect(wrongPassPayload.body).to.have.property('status').eql('error');
    expect(wrongPassPayload.body)
      .to.have.property('message')
      .eql('Error in Database query usage');
    expect(wrongPassPayload.body).to.have.property('data');
  });

  it('Should give please try again when start date is not present in db', async () => {
    const productDataNotPresent = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(dataNotPresent)
      .expect(200);

    expect(productDataNotPresent.status).eql(200);
    expect(productDataNotPresent.body).to.be.an('object');
    expect(productDataNotPresent.body)
      .to.have.property('status')
      .eql('success');
    expect(productDataNotPresent.body)
      .to.have.property('message')
      .eql('Please try again.');
    expect(productDataNotPresent.body).to.have.property('data');
    expect(productDataNotPresent.body.data).to.be.an('array');
    expect(productDataNotPresent.body.data.length).eql(0);
  });

  it('Should give list of data till end date when start date is null in payload.', async () => {
    const passStartDateNull = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(purchasedProductsReportStartDateNull)
      .expect(200);

    expect(passStartDateNull.status).eql(200);
    expect(passStartDateNull.body).to.be.an('object');
    expect(passStartDateNull.body).to.have.property('status').eql('success');
    expect(passStartDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passStartDateNull.body).to.have.property('data');
    expect(passStartDateNull.body.data).to.be.an('object');
    expect(passStartDateNull.body.data).to.have.property('product');
    expect(passStartDateNull.body.data.product).to.be.an('array');
    expect(passStartDateNull.body.data.product[0]).to.have.property('name');
    expect(passStartDateNull.body.data.product[0]).to.have.property('quantity');
  });

  it('Should give list of data from start date when end date is null in payload.', async () => {
    const passEndDateNull = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(purchasedProductsReportEndDateNull)
      .expect(200);

    expect(passEndDateNull.status).eql(200);
    expect(passEndDateNull.body).to.be.an('object');
    expect(passEndDateNull.body).to.have.property('status').eql('success');
    expect(passEndDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passEndDateNull.body).to.have.property('data');
    expect(passEndDateNull.body.data).to.be.an('object');
    expect(passEndDateNull.body.data).to.have.property('product');
    expect(passEndDateNull.body.data.product).to.be.an('array');
    expect(passEndDateNull.body.data.product[0]).to.have.property('name');
    expect(passEndDateNull.body.data.product[0]).to.have.property('quantity');
  });

  it('Should give list of data when start date and end date is null in payload.', async () => {
    const passStartDateAndEndDateNull = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(passPurchasedProductsReportDateNull)
      .expect(200);

    expect(passStartDateAndEndDateNull.status).eql(200);
    expect(passStartDateAndEndDateNull.body).to.be.an('object');
    expect(passStartDateAndEndDateNull.body)
      .to.have.property('status')
      .eql('success');
    expect(passStartDateAndEndDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passStartDateAndEndDateNull.body).to.have.property('data');
    expect(passStartDateAndEndDateNull.body.data).to.be.an('object');
    expect(passStartDateAndEndDateNull.body.data).to.have.property('product');
    expect(passStartDateAndEndDateNull.body.data.product).to.be.an('array');
    expect(passStartDateAndEndDateNull.body.data.product[0]).to.have.property(
      'name'
    );
    expect(passStartDateAndEndDateNull.body.data.product[0]).to.have.property(
      'quantity'
    );
  });

  it('Should give all data when limit not pass in payload.', async () => {
    const notPassLimit = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(purchasedProductsReportNotPassLimit)
      .expect(200);

    expect(notPassLimit.status).eql(200);
    expect(notPassLimit.body).to.be.an('object');
    expect(notPassLimit.body).to.have.property('status').eql('success');
    expect(notPassLimit.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(notPassLimit.body).to.have.property('data');
    expect(notPassLimit.body.data).to.be.an('object');
    expect(notPassLimit.body.data).to.have.property('product');
    expect(notPassLimit.body.data.product).to.be.an('array');
    expect(notPassLimit.body.data.product[0]).to.have.property('name');
    expect(notPassLimit.body.data.product[0]).to.have.property('quantity');
  });

  it('Should give all data when not pass payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send({})
      .expect(200);

    expect(emptyPayload.status).eql(200);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('success');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(emptyPayload.body).to.have.property('data');
    expect(emptyPayload.body.data).to.be.an('object');
    expect(emptyPayload.body.data).to.have.property('product');
    expect(emptyPayload.body.data.product).to.be.an('array');
    expect(emptyPayload.body.data.product[0]).to.have.property('name');
    expect(emptyPayload.body.data.product[0]).to.have.property('quantity');
  });

  it('Should give success when record is get successfully.', async () => {
    sinon.stub(reportController, 'purchasedProducts').resolves(200);
    const getPurchasedProductsData = await supertest
      .post('/api/admin/purchasedProducts')
      .set('authorization', token)
      .send(purchasedProductsData)
      .expect(200);

    expect(getPurchasedProductsData.status).eql(200);
    expect(getPurchasedProductsData.body).to.be.an('object');
    expect(getPurchasedProductsData.body)
      .to.have.property('status')
      .eql('success');
    expect(getPurchasedProductsData.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(getPurchasedProductsData.body).to.have.property('data');
    expect(getPurchasedProductsData.body.data).to.be.an('object');
    expect(getPurchasedProductsData.body.data).to.have.property('product');
    expect(getPurchasedProductsData.body.data.product).to.be.an('array');
    expect(getPurchasedProductsData.body.data.product[0]).to.have.property(
      'name'
    );
    expect(getPurchasedProductsData.body.data.product[0]).to.have.property(
      'quantity'
    );
  });
});

describe('POST /api/admin/vendorReport', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/admin/vendorReport')
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
      .post('/api/admin/vendorReport')
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
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(checkVendorReportObjectValidation)
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

  it('Should give validation error when limit is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(checkVendorReportValidation)
      .expect(400);
    expect(checkPayloadValidation.status).eql(400);
    expect(checkPayloadValidation.body).to.be.an('object');
    expect(checkPayloadValidation.body).to.have.property('status').eql('error');
    expect(checkPayloadValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkPayloadValidation.body).to.have.property('data');
    expect(checkPayloadValidation.body.data).to.be.an('object');
    expect(checkPayloadValidation.body.data).to.have.property('limit');
    expect(checkPayloadValidation.body.data.limit).to.be.an('object');
    expect(checkPayloadValidation.body.data.limit)
      .to.have.property('message')
      .eql('Limit should be a type of number');
  });

  it('Should give validation error when pass wrong start date format in payload.', async () => {
    const checkValidation = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(checkVendorReportDateValidation)
      .expect(400);
    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('startDate');
    expect(checkValidation.body.data.startDate).to.be.an('object');
    expect(checkValidation.body.data.startDate)
      .to.have.property('message')
      .eql('Start date format not valid');
  });

  it('Should give error when pass wrong sort value in payload.', async () => {
    const wrongPassPayload = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(wrongVendorReportData)
      .expect(500);
    expect(wrongPassPayload.status).eql(500);
    expect(wrongPassPayload.body).to.be.an('object');
    expect(wrongPassPayload.body).to.have.property('status').eql('error');
    expect(wrongPassPayload.body)
      .to.have.property('message')
      .eql('Error in Database query usage');
    expect(wrongPassPayload.body).to.have.property('data');
  });

  it('Should give please try again when start date is not present in db', async () => {
    const vendorDataNotPresent = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(vendorReportDataNotPresent)
      .expect(200);

    expect(vendorDataNotPresent.status).eql(200);
    expect(vendorDataNotPresent.body).to.be.an('object');
    expect(vendorDataNotPresent.body).to.have.property('status').eql('success');
    expect(vendorDataNotPresent.body)
      .to.have.property('message')
      .eql('Please try again.');
    expect(vendorDataNotPresent.body).to.have.property('data');
    expect(vendorDataNotPresent.body.data).to.be.an('array');
    expect(vendorDataNotPresent.body.data.length).eql(0);
  });

  it('Should give list of data till end date when start date is null in payload.', async () => {
    const passStartDateNull = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(vendorReportStartDateNull)
      .expect(200);

    expect(passStartDateNull.status).eql(200);
    expect(passStartDateNull.body).to.be.an('object');
    expect(passStartDateNull.body).to.have.property('status').eql('success');
    expect(passStartDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passStartDateNull.body).to.have.property('data');
    expect(passStartDateNull.body.data).to.be.an('object');
    expect(passStartDateNull.body.data).to.have.property('vendor');
    expect(passStartDateNull.body.data.vendor).to.be.an('array');
    expect(passStartDateNull.body.data.vendor[0]).to.have.property(
      'first_name'
    );
    expect(passStartDateNull.body.data.vendor[0]).to.have.property('total');
  });

  it('Should give list of data from start date when end date is null in payload.', async () => {
    const passEndDateNull = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(vendorReportEndDateNull)
      .expect(200);

    expect(passEndDateNull.status).eql(200);
    expect(passEndDateNull.body).to.be.an('object');
    expect(passEndDateNull.body).to.have.property('status').eql('success');
    expect(passEndDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passEndDateNull.body).to.have.property('data');
    expect(passEndDateNull.body.data).to.be.an('object');
    expect(passEndDateNull.body.data).to.have.property('vendor');
    expect(passEndDateNull.body.data.vendor).to.be.an('array');
    expect(passEndDateNull.body.data.vendor[0]).to.have.property('first_name');
    expect(passEndDateNull.body.data.vendor[0]).to.have.property('total');
  });

  it('Should give list of data when start date and end date is null in payload.', async () => {
    const passStartDateAndEndDateNull = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(passVendorReportDateNull)
      .expect(200);

    expect(passStartDateAndEndDateNull.status).eql(200);
    expect(passStartDateAndEndDateNull.body).to.be.an('object');
    expect(passStartDateAndEndDateNull.body)
      .to.have.property('status')
      .eql('success');
    expect(passStartDateAndEndDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passStartDateAndEndDateNull.body).to.have.property('data');
    expect(passStartDateAndEndDateNull.body.data).to.be.an('object');
    expect(passStartDateAndEndDateNull.body.data).to.have.property('vendor');
    expect(passStartDateAndEndDateNull.body.data.vendor).to.be.an('array');
    expect(passStartDateAndEndDateNull.body.data.vendor[0]).to.have.property(
      'first_name'
    );
    expect(passStartDateAndEndDateNull.body.data.vendor[0]).to.have.property(
      'total'
    );
  });

  it('Should give all data when limit not pass in payload.', async () => {
    const notPassLimit = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(vendorReportNotPassLimit)
      .expect(200);

    expect(notPassLimit.status).eql(200);
    expect(notPassLimit.body).to.be.an('object');
    expect(notPassLimit.body).to.have.property('status').eql('success');
    expect(notPassLimit.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(notPassLimit.body).to.have.property('data');
    expect(notPassLimit.body.data).to.be.an('object');
    expect(notPassLimit.body.data).to.have.property('vendor');
    expect(notPassLimit.body.data.vendor).to.be.an('array');
    expect(notPassLimit.body.data.vendor[0]).to.have.property('first_name');
    expect(notPassLimit.body.data.vendor[0]).to.have.property('total');
  });

  it('Should give all data when not pass payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send({})
      .expect(200);

    expect(emptyPayload.status).eql(200);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('success');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(emptyPayload.body).to.have.property('data');
    expect(emptyPayload.body.data).to.be.an('object');
    expect(emptyPayload.body.data).to.have.property('vendor');
    expect(emptyPayload.body.data.vendor).to.be.an('array');
    expect(emptyPayload.body.data.vendor[0]).to.have.property('first_name');
    expect(emptyPayload.body.data.vendor[0]).to.have.property('total');
  });

  it('Should give success when record is get successfully.', async () => {
    sinon.stub(reportController, 'vendorReport').resolves(200);
    const getVendorReportData = await supertest
      .post('/api/admin/vendorReport')
      .set('authorization', token)
      .send(vendorReportData)
      .expect(200);
    expect(getVendorReportData.status).eql(200);
    expect(getVendorReportData.body).to.be.an('object');
    expect(getVendorReportData.body).to.have.property('status').eql('success');
    expect(getVendorReportData.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(getVendorReportData.body).to.have.property('data');
    expect(getVendorReportData.body.data).to.be.an('object');
    expect(getVendorReportData.body.data).to.have.property('vendor');
    expect(getVendorReportData.body.data.vendor).to.be.an('array');
    expect(getVendorReportData.body.data.vendor[0]).to.have.property(
      'first_name'
    );
    expect(getVendorReportData.body.data.vendor[0]).to.have.property('total');
  });
});

describe('POST /api/admin/salesReport', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/admin/salesReport')
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
      .post('/api/admin/salesReport')
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
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(checkSalesReportObjectValidation)
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

  it('Should give validation error when limit is string in payload.', async () => {
    const checkPayloadValidation = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(checkSalesReportValidation)
      .expect(400);

    expect(checkPayloadValidation.status).eql(400);
    expect(checkPayloadValidation.body).to.be.an('object');
    expect(checkPayloadValidation.body).to.have.property('status').eql('error');
    expect(checkPayloadValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkPayloadValidation.body).to.have.property('data');
    expect(checkPayloadValidation.body.data).to.be.an('object');
    expect(checkPayloadValidation.body.data).to.have.property('limit');
    expect(checkPayloadValidation.body.data.limit).to.be.an('object');
    expect(checkPayloadValidation.body.data.limit)
      .to.have.property('message')
      .eql('Limit should be a type of number');
  });

  it('Should give validation error when pass wrong start date format in payload.', async () => {
    const checkValidation = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(checkSalesDateValidation)
      .expect(400);

    expect(checkValidation.status).eql(400);
    expect(checkValidation.body).to.be.an('object');
    expect(checkValidation.body).to.have.property('status').eql('error');
    expect(checkValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(checkValidation.body).to.have.property('data');
    expect(checkValidation.body.data).to.be.an('object');
    expect(checkValidation.body.data).to.have.property('startDate');
    expect(checkValidation.body.data.startDate).to.be.an('object');
    expect(checkValidation.body.data.startDate)
      .to.have.property('message')
      .eql('Start date format not valid');
  });

  it('Should give error when pass wrong sort value in payload.', async () => {
    const wrongPassPayload = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(wrongSalesData)
      .expect(500);

    expect(wrongPassPayload.status).eql(500);
    expect(wrongPassPayload.body).to.be.an('object');
    expect(wrongPassPayload.body).to.have.property('status').eql('error');
    expect(wrongPassPayload.body)
      .to.have.property('message')
      .eql('Error in Database query usage');
    expect(wrongPassPayload.body).to.have.property('data');
  });

  it('Should give please try again when start date is not present in db', async () => {
    const saleDataNotPresent = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(salesReportDataNotPresent)
      .expect(200);

    expect(saleDataNotPresent.status).eql(200);
    expect(saleDataNotPresent.body).to.be.an('object');
    expect(saleDataNotPresent.body).to.have.property('status').eql('error');
    expect(saleDataNotPresent.body)
      .to.have.property('message')
      .eql('Please try again.');
    expect(saleDataNotPresent.body).to.have.property('data');
    expect(saleDataNotPresent.body.data).to.be.an('array');
    expect(saleDataNotPresent.body.data.length).eql(0);
  });

  it('Should give list of data till end date when start date is null in payload.', async () => {
    const passStartDateNull = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(salesReportStartDateNull)
      .expect(200);

    expect(passStartDateNull.status).eql(200);
    expect(passStartDateNull.body).to.be.an('object');
    expect(passStartDateNull.body).to.have.property('status').eql('success');
    expect(passStartDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passStartDateNull.body).to.have.property('data');
    expect(passStartDateNull.body.data).to.be.an('array');
    expect(passStartDateNull.body.data[0]).to.have.property('noOfOrder');
    expect(passStartDateNull.body.data[0]).to.have.property('noOfProduct');
  });

  it('Should give list of data from start date when end date is null in payload.', async () => {
    const passEndDateNull = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(salesReportEndDateNull)
      .expect(200);

    expect(passEndDateNull.status).eql(200);
    expect(passEndDateNull.body).to.be.an('object');
    expect(passEndDateNull.body).to.have.property('status').eql('success');
    expect(passEndDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passEndDateNull.body).to.have.property('data');
    expect(passEndDateNull.body.data).to.be.an('array');
    expect(passEndDateNull.body.data[0]).to.have.property('noOfOrder');
    expect(passEndDateNull.body.data[0]).to.have.property('noOfProduct');
  });

  it('Should give list of data when start date and end date is null in payload.', async () => {
    const passStartDateAndEndDateNull = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(passSalesReportDateNull)
      .expect(200);

    expect(passStartDateAndEndDateNull.status).eql(200);
    expect(passStartDateAndEndDateNull.body).to.be.an('object');
    expect(passStartDateAndEndDateNull.body)
      .to.have.property('status')
      .eql('success');
    expect(passStartDateAndEndDateNull.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(passStartDateAndEndDateNull.body).to.have.property('data');
    expect(passStartDateAndEndDateNull.body.data).to.be.an('array');
    expect(passStartDateAndEndDateNull.body.data[0]).to.have.property(
      'noOfOrder'
    );
    expect(passStartDateAndEndDateNull.body.data[0]).to.have.property(
      'noOfProduct'
    );
  });

  it('Should give all data when limit not pass in payload.', async () => {
    const notPassLimit = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(salesReportNotPassLimit)
      .expect(200);

    expect(notPassLimit.status).eql(200);
    expect(notPassLimit.body).to.be.an('object');
    expect(notPassLimit.body).to.have.property('status').eql('success');
    expect(notPassLimit.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(notPassLimit.body).to.have.property('data');
    expect(notPassLimit.body.data).to.be.an('array');
    expect(notPassLimit.body.data[0]).to.have.property('noOfOrder');
    expect(notPassLimit.body.data[0]).to.have.property('noOfProduct');
  });

  it('Should give list of getting data when payload is empty.', async () => {
    const emptyPayload = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send({})
      .expect(200);

    expect(emptyPayload.status).eql(200);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('success');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(emptyPayload.body).to.have.property('data');
    expect(emptyPayload.body.data).to.be.an('array');
    expect(emptyPayload.body.data[0]).to.have.property('noOfOrder');
    expect(emptyPayload.body.data[0]).to.have.property('noOfProduct');
  });

  it('Should give success when record is get successfully.', async () => {
    sinon.stub(reportController, 'saleReport').resolves(200);
    const getSaleData = await supertest
      .post('/api/admin/salesReport')
      .set('authorization', token)
      .send(salesData)
      .expect(200);

    expect(getSaleData.status).eql(200);
    expect(getSaleData.body).to.be.an('object');
    expect(getSaleData.body).to.have.property('status').eql('success');
    expect(getSaleData.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(getSaleData.body).to.have.property('data');
    expect(getSaleData.body.data).to.be.an('array');
    expect(getSaleData.body.data[0]).to.have.property('noOfOrder');
    expect(getSaleData.body.data[0]).to.have.property('noOfProduct');
  });
});

describe('POST /api/admin/customerTransactionReport', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/admin/customerTransactionReport')
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
      .post('/api/admin/customerTransactionReport')
      .set('authorization', expireToken)
      .expect(401);
    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when pass wrong start date format in payload.', async () => {
    const dateValidation = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(checkCustomerValidation)
      .expect(400);
    expect(dateValidation.status).eql(400);
    expect(dateValidation.body).to.be.an('object');
    expect(dateValidation.body).to.have.property('status').eql('error');
    expect(dateValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(dateValidation.body).to.have.property('data');
    expect(dateValidation.body.data).to.be.an('object');
    expect(dateValidation.body.data).to.have.property('startDate');
    expect(dateValidation.body.data.startDate).to.be.an('object');
    expect(dateValidation.body.data.startDate)
      .to.have.property('message')
      .eql('Start date format not valid');
  });

  it('Should give validation error when sort is string in payload', async () => {
    const objectValidation = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(sortValidation)
      .expect(400);
    expect(objectValidation.status).eql(400);
    expect(objectValidation.body).to.be.an('object');
    expect(objectValidation.body).to.have.property('status').eql('error');
    expect(objectValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(objectValidation.body).to.have.property('data');
    expect(objectValidation.body.data).to.be.an('object');
    expect(objectValidation.body.data).to.have.property('sort');
    expect(objectValidation.body.data.sort).to.be.an('object');
    expect(objectValidation.body.data.sort)
      .to.have.property('message')
      .eql('Sort should be a type of object');
  });

  it('Should give validation error when customer name is number in payload', async () => {
    const customerNameValidation = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(nameValidation)
      .expect(400);

    expect(customerNameValidation.status).eql(400);
    expect(customerNameValidation.body).to.be.an('object');
    expect(customerNameValidation.body).to.have.property('status').eql('error');
    expect(customerNameValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(customerNameValidation.body).to.have.property('data');
    expect(customerNameValidation.body.data).to.be.an('object');
    expect(customerNameValidation.body.data).to.have.property('customerName');
    expect(customerNameValidation.body.data.customerName).to.be.an('object');
    expect(customerNameValidation.body.data.customerName)
      .to.have.property('message')
      .eql('Customer name should be a type of text');
  });

  it('Should give please try again when startDate and endDate are not present in DB.', async () => {
    const invalidCustomerData = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(invalidCustomerTransaction)
      .expect(200);
    expect(invalidCustomerData.status).eql(200);
    expect(invalidCustomerData.body).to.be.an('object');
    expect(invalidCustomerData.body).to.have.property('status').eql('success');
    expect(invalidCustomerData.body)
      .to.have.property('message')
      .eql('Please try again.');
  });

  it('Should give list of getting data when startDate and endDate are null in payload', async () => {
    const customerNullValidation = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(nullValidation)
      .expect(200);
    expect(customerNullValidation.status).eql(200);
    expect(customerNullValidation.body).to.be.an('object');
    expect(customerNullValidation.body).to.have.property('status').eql('success');
    expect(customerNullValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(customerNullValidation.body).to.have.property('data');
    expect(customerNullValidation.body.data).to.be.an('array');
    expect(customerNullValidation.body.data[0]).to.have.property('customerName');
  });

  it('Should give list of getting data when pass only limit in payload', async () => {
    const customerLimitValidation = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(limitValidation)
      .expect(200);
    expect(customerLimitValidation.status).eql(200);
    expect(customerLimitValidation.body).to.be.an('object');
    expect(customerLimitValidation.body).to.have.property('status').eql('success');
    expect(customerLimitValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(customerLimitValidation.body).to.have.property('data');
    expect(customerLimitValidation.body.data).to.be.an('array');
    expect(customerLimitValidation.body.data[0]).to.have.property('customerName');
  });

  it('Should give list of getting data when pass only startDate in payload', async () => {
    const startDate = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(startDateDetails)
      .expect(200);
    expect(startDate.status).eql(200);
    expect(startDate.body).to.be.an('object');
    expect(startDate.body).to.have.property('status').eql('success');
    expect(startDate.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(startDate.body).to.have.property('data');
    expect(startDate.body.data).to.be.an('array');
    expect(startDate.body.data[0]).to.have.property('customerName');
    expect(startDate.body.data[0]).to.have.property('Email');
  });

  it('Should give list of getting data when pass only endDate in payload', async () => {
    const endDate = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(endDateDetails)
      .expect(200);
    expect(endDate.status).eql(200);
    expect(endDate.body).to.be.an('object');
    expect(endDate.body).to.have.property('status').eql('success');
    expect(endDate.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(endDate.body).to.have.property('data');
    expect(endDate.body.data).to.be.an('array');
    expect(endDate.body.data[0]).to.have.property('customerName');
    expect(endDate.body.data[0]).to.have.property('Email');
  });

  it('Should give list of getting data when payload is empty', async () => {
    const emptyPayloadValidation = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send({})
      .expect(200);
    expect(emptyPayloadValidation.status).eql(200);
    expect(emptyPayloadValidation.body).to.be.an('object');
    expect(emptyPayloadValidation.body).to.have.property('status').eql('success');
    expect(emptyPayloadValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(emptyPayloadValidation.body).to.have.property('data');
    expect(emptyPayloadValidation.body.data).to.be.an('array');
    expect(emptyPayloadValidation.body.data[0]).to.have.property('customerName');
    expect(emptyPayloadValidation.body.data[0]).to.have.property('Email');
  });

  it('Should give list of getting data when pass valid payload', async () => {
    const validData = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(validCustomerTransaction)
      .expect(200);
    expect(validData.status).eql(200);
    expect(validData.body).to.be.an('object');
    expect(validData.body).to.have.property('status').eql('success');
    expect(validData.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(validData.body).to.have.property('data');
    expect(validData.body.data).to.be.an('array');
    expect(validData.body.data[0]).to.have.property('customerName');
    expect(validData.body.data[0]).to.have.property('Email');
  });
});

describe('POST /api/admin/customerReport', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/admin/customerReport')
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
      .post('/api/admin/customerReport')
      .set('authorization', expireToken)
      .expect(401);
    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when pass wrong start date format in payload.', async () => {
    const dateValidation = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send(checkCustomerValidation)
      .expect(400);

    expect(dateValidation.status).eql(400);
    expect(dateValidation.body).to.be.an('object');
    expect(dateValidation.body).to.have.property('status').eql('error');
    expect(dateValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(dateValidation.body).to.have.property('data');
    expect(dateValidation.body.data).to.be.an('object');
    expect(dateValidation.body.data).to.have.property('startDate');
    expect(dateValidation.body.data.startDate).to.be.an('object');
    expect(dateValidation.body.data.startDate)
      .to.have.property('message')
      .eql('Start date format not valid');
  });

  it('Should give validation error when sort is string in payload', async () => {
    const stringValidation = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send(stringSortValidation)
      .expect(400);

    expect(stringValidation.status).eql(400);
    expect(stringValidation.body).to.be.an('object');
    expect(stringValidation.body).to.have.property('status').eql('error');
    expect(stringValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(stringValidation.body).to.have.property('data');
    expect(stringValidation.body.data).to.be.an('object');
    expect(stringValidation.body.data).to.have.property('sort');
    expect(stringValidation.body.data.sort).to.be.an('object');
    expect(stringValidation.body.data.sort)
      .to.have.property('message')
      .eql('Sort should be a type of text');
  });

  it('Should give please try again when date is not present in db', async () => {
    const inValidData = await supertest
      .post('/api/admin/customerTransactionReport')
      .set('authorization', token)
      .send(invalidCustomerTransaction)
      .expect(200);
    expect(inValidData.status).eql(200);
    expect(inValidData.body).to.be.an('object');
    expect(inValidData.body).to.have.property('status').eql('success');
    expect(inValidData.body)
      .to.have.property('message')
      .eql('Please try again.');
  });

  it('Should give list of getting data when date is null in payload', async () => {
    const customerNullValidation = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send(nullValidation)
      .expect(200);
    expect(customerNullValidation.status).eql(200);
    expect(customerNullValidation.body).to.be.an('object');
    expect(customerNullValidation.body).to.have.property('status').eql('success');
    expect(customerNullValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(customerNullValidation.body).to.have.property('data');
    expect(customerNullValidation.body.data).to.be.an('array');
    expect(customerNullValidation.body.data[0]).to.have.property('id');
    expect(customerNullValidation.body.data[0]).to.have.property('is_archived');
  });

  it('Should give list of getting data when pass only limit in payload.', async () => {
    const customerLimitValidation = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send(limitValidation)
      .expect(200);
    expect(customerLimitValidation.status).eql(200);
    expect(customerLimitValidation.body).to.be.an('object');
    expect(customerLimitValidation.body).to.have.property('status').eql('success');
    expect(customerLimitValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(customerLimitValidation.body).to.have.property('data');
    expect(customerLimitValidation.body.data).to.be.an('array');
    expect(customerLimitValidation.body.data[0]).to.have.property('id');
    expect(customerLimitValidation.body.data[0]).to.have.property('is_archived');
  });

  it('Should give list of getting data when pass only startDate in payload', async () => {
    const startDate = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send(startDateDetails)
      .expect(200);
    expect(startDate.status).eql(200);
    expect(startDate.body).to.be.an('object');
    expect(startDate.body).to.have.property('status').eql('success');
    expect(startDate.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(startDate.body).to.have.property('data');
    expect(startDate.body.data).to.be.an('array');
    expect(startDate.body.data[0]).to.have.property('id');
    expect(startDate.body.data[0]).to.have.property('is_archived');
  });

  it('Should give list of getting data when pass only endDate in payload', async () => {
    const endDate = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send(endDateDetails)
      .expect(200);
    expect(endDate.status).eql(200);
    expect(endDate.body).to.be.an('object');
    expect(endDate.body).to.have.property('status').eql('success');
    expect(endDate.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(endDate.body).to.have.property('data');
    expect(endDate.body.data).to.be.an('array');
    expect(endDate.body.data[0]).to.have.property('id');
    expect(endDate.body.data[0]).to.have.property('is_archived');
  });

  it('Should give list of getting data when payload is empty', async () => {
    const emptyPayloadValidation = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send({})
      .expect(200);
    expect(emptyPayloadValidation.status).eql(200);
    expect(emptyPayloadValidation.body).to.be.an('object');
    expect(emptyPayloadValidation.body).to.have.property('status').eql('success');
    expect(emptyPayloadValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(emptyPayloadValidation.body).to.have.property('data');
    expect(emptyPayloadValidation.body.data).to.be.an('array');
    expect(emptyPayloadValidation.body.data[0]).to.have.property('id');
    expect(emptyPayloadValidation.body.data[0]).to.have.property('is_archived');
  });

  it('Should give list of getting data when pass valid payload', async () => {
    const validData = await supertest
      .post('/api/admin/customerReport')
      .set('authorization', token)
      .send(validCustomer)
      .expect(200);
    expect(validData.status).eql(200);
    expect(validData.body).to.be.an('object');
    expect(validData.body).to.have.property('status').eql('success');
    expect(validData.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(validData.body).to.have.property('data');
    expect(validData.body.data).to.be.an('array');
    expect(validData.body.data[0]).to.have.property('id');
    expect(validData.body.data[0]).to.have.property('is_archived');
  });
});

describe('POST /api/admin/customerOrderReport', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/admin/customerReport')
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
      .post('/api/admin/customerOrderReport')
      .set('authorization', expireToken)
      .expect(401);
    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give validation error when pass wrong start date format in payload.', async () => {
    const dateValidation = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(checkCustomerValidation)
      .expect(400);

    expect(dateValidation.status).eql(400);
    expect(dateValidation.body).to.be.an('object');
    expect(dateValidation.body).to.have.property('status').eql('error');
    expect(dateValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(dateValidation.body).to.have.property('data');
    expect(dateValidation.body.data).to.be.an('object');
    expect(dateValidation.body.data).to.have.property('startDate');
    expect(dateValidation.body.data.startDate).to.be.an('object');
    expect(dateValidation.body.data.startDate)
      .to.have.property('message')
      .eql('Start date format not valid');
  });

  it('Should give validation error when sort is string in payload', async () => {
    const stringValidation = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(stringSortValidation)
      .expect(400);

    expect(stringValidation.status).eql(400);
    expect(stringValidation.body).to.be.an('object');
    expect(stringValidation.body).to.have.property('status').eql('error');
    expect(stringValidation.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(stringValidation.body).to.have.property('data');
    expect(stringValidation.body.data).to.be.an('object');
    expect(stringValidation.body.data).to.have.property('sort');
    expect(stringValidation.body.data.sort).to.be.an('object');
    expect(stringValidation.body.data.sort)
      .to.have.property('message')
      .eql('Sort should be a type of object');
  });

  it('Should give please try again when pass invalid data in payload', async () => {
    const inValidData = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(invalidCustomerTransaction)
      .expect(200);
    expect(inValidData.status).eql(200);
    expect(inValidData.body).to.be.an('object');
    expect(inValidData.body).to.have.property('status').eql('success');
    expect(inValidData.body)
      .to.have.property('message')
      .eql('Please try again.');
  });

  it('Should give list of getting data when startDate and endDate are null in payload', async () => {
    const customerNullValidation = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(nullValidation)
      .expect(200);
    expect(customerNullValidation.status).eql(200);
    expect(customerNullValidation.body).to.be.an('object');
    expect(customerNullValidation.body).to.have.property('status').eql('success');
    expect(customerNullValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(customerNullValidation.body).to.have.property('data');
    expect(customerNullValidation.body.data).to.be.an('array');
    expect(customerNullValidation.body.data[0]).to.have.property('customerName');
  });

  it('Should give list of getting data when pass only limit in payload.', async () => {
    const customerLimitValidation = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(limitValidation)
      .expect(200);
    expect(customerLimitValidation.status).eql(200);
    expect(customerLimitValidation.body).to.be.an('object');
    expect(customerLimitValidation.body).to.have.property('status').eql('success');
    expect(customerLimitValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(customerLimitValidation.body).to.have.property('data');
    expect(customerLimitValidation.body.data).to.be.an('array');
    expect(customerLimitValidation.body.data[0]).to.have.property('customerName');
  });

  it('Should give list of getting data when pass only startDate in payload', async () => {
    const startDate = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(startDateDetails)
      .expect(200);
    expect(startDate.status).eql(200);
    expect(startDate.body).to.be.an('object');
    expect(startDate.body).to.have.property('status').eql('success');
    expect(startDate.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(startDate.body).to.have.property('data');
    expect(startDate.body.data).to.be.an('array');
    expect(startDate.body.data[0]).to.have.property('customerName');
  });

  it('Should give list of getting data when pass only endDate in payload', async () => {
    const endDate = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(endDateDetails)
      .expect(200);
    expect(endDate.status).eql(200);
    expect(endDate.body).to.be.an('object');
    expect(endDate.body).to.have.property('status').eql('success');
    expect(endDate.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(endDate.body).to.have.property('data');
    expect(endDate.body.data).to.be.an('array');
    expect(endDate.body.data[0]).to.have.property('customerName');
  });

  it('Should give list of getting data when payload is empty', async () => {
    const emptyPayloadValidation = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send({})
      .expect(200);
    expect(emptyPayloadValidation.status).eql(200);
    expect(emptyPayloadValidation.body).to.be.an('object');
    expect(emptyPayloadValidation.body).to.have.property('status').eql('success');
    expect(emptyPayloadValidation.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(emptyPayloadValidation.body).to.have.property('data');
    expect(emptyPayloadValidation.body.data).to.be.an('array');
    expect(emptyPayloadValidation.body.data[0]).to.have.property('customerName');
  });

  it('Should give list of getting data when pass valid payload', async () => {
    const validData = await supertest
      .post('/api/admin/customerOrderReport')
      .set('authorization', token)
      .send(validCustomerOrderData)
      .expect(200);
    expect(validData.status).eql(200);
    expect(validData.body).to.be.an('object');
    expect(validData.body).to.have.property('status').eql('success');
    expect(validData.body)
      .to.have.property('message')
      .eql('List of getting data.');
    expect(validData.body).to.have.property('data');
    expect(validData.body.data).to.be.an('array');
    expect(validData.body.data[0]).to.have.property('customerName');
  });
});