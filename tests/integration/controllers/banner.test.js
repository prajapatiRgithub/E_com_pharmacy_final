const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
let { token, expireToken } = require('../../env.json');
const bannerController = require('../../../api/controllers/BannerController');
const expect = require('chai').expect;

describe('POST /api/banner/addBanner', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .post('/api/banner/addBanner')
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
      .post('/api/banner/addBanner')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give error when not pass payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/banner/addBanner')
      .set('authorization', token)
      .attach({})
      .expect(400);

    expect(emptyPayload.status).eql(400);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('error');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('Image is required field');
  });
});

describe('PUT /api/banner/editBanner/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/banner/editBanner/1')
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
      .put('/api/banner/editBanner/1')
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
      .put('/api/banner/editBanner/1000')
      .set('authorization', token)
      .attach(
        'image',
        '.tmp/public/images/018c89d1-a498-48bb-9e35-f45dc2d3e6e4.jpg'
      )
      .expect(200);

    expect(checkIdValidation.status).eql(200);
    expect(checkIdValidation.body).to.be.an('object');
    expect(checkIdValidation.body).to.have.property('status').eql('error');
    expect(checkIdValidation.body)
      .to.have.property('message')
      .eql('Id not found');
  });

  it('Should give validation error when id is string in params.', async () => {
    const failedBanner = await supertest
      .put('/api/banner/editBanner/abc')
      .set('authorization', token)
      .attach(
        'image',
        '.tmp/public/images/018c89d1-a498-48bb-9e35-f45dc2d3e6e4.jpg'
      )
      .expect(400);

    expect(failedBanner.status).eql(400);
    expect(failedBanner.body).to.be.an('object');
    expect(failedBanner.body).to.have.property('status').eql('error');
    expect(failedBanner.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(failedBanner.body).to.have.property('data');
    expect(failedBanner.body.data).to.be.an('object');
    expect(failedBanner.body.data).to.have.property('id');
    expect(failedBanner.body.data.id).to.be.an('object');
    expect(failedBanner.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give error when not pass payload.', async () => {
    const emptyPayload = await supertest
      .put('/api/banner/editBanner/1')
      .set('authorization', token)
      .attach({})
      .expect(400);

    expect(emptyPayload.status).eql(400);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('error');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('Image is required field');
  });
});

describe('DELETE /api/banner/deleteBanner/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .delete('/api/banner/deleteBanner/1')
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
      .delete('/api/banner/deleteBanner/1')
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
    const failedBanner = await supertest
      .delete('/api/banner/deleteBanner/abc')
      .set('authorization', token)
      .expect(400);

    expect(failedBanner.status).eql(400);
    expect(failedBanner.body).to.be.an('object');
    expect(failedBanner.body).to.have.property('status').eql('error');
    expect(failedBanner.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(failedBanner.body).to.have.property('data');
    expect(failedBanner.body.data).to.be.an('object');
    expect(failedBanner.body.data).to.have.property('id');
    expect(failedBanner.body.data.id).to.be.an('object');
    expect(failedBanner.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give id not found when id not present in db.', async () => {
    const checkIdValidation = await supertest
      .delete('/api/banner/deleteBanner/1000')
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
  it('Should allows user to add, update, get and delete their favorite banner.', async () => {
    sinon.stub(bannerController, 'addBanner').resolves(200);
    const insertBanner = await supertest
      .post('/api/banner/addBanner')
      .set('authorization', token)
      .attach(
        'image',
        '.tmp/public/images/018c89d1-a498-48bb-9e35-f45dc2d3e6e4.jpg'
      )
      .expect(200);

    expect(insertBanner.status).eql(200);
    expect(insertBanner.body).to.be.an('object');
    expect(insertBanner.body).to.have.property('status').eql('success');
    expect(insertBanner.body)
      .to.have.property('message')
      .eql('Banner added successfully');

    id = insertBanner.body.data.id;

    sinon.stub(bannerController, 'editBanner').resolves(200);
    const updateBanner = await supertest
      .put(`/api/banner/editBanner/${id}`)
      .set('authorization', token)
      .attach(
        'image',
        '.tmp/public/images/018c89d1-a498-48bb-9e35-f45dc2d3e6e4.jpg'
      )
      .expect(200);

    expect(updateBanner.status).eql(200);
    expect(updateBanner.body).to.be.an('object');
    expect(updateBanner.body).to.have.property('status').eql('success');
    expect(updateBanner.body)
      .to.have.property('message')
      .eql('Your banner is updated successfully.');

    sinon.stub(bannerController, 'deleteBanner').resolves(200);
    const deleteBanner = await supertest
      .delete(`/api/banner/deleteBanner/${id}`)
      .set('authorization', token)
      .expect(200);

    expect(deleteBanner.status).eql(200);
    expect(deleteBanner.body).to.be.an('object');
    expect(deleteBanner.body).to.have.property('status').eql('success');
    expect(deleteBanner.body)
      .to.have.property('message')
      .eql('Banner deleted successfully');
  });
});
