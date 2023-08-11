const sinon = require('sinon');
const supertest = require('supertest')('http://localhost:1337');
const expect = require('chai').expect;
const userController = require('../../../api/controllers/UserController');
const {
  registrationData,
  passwordData,
  numberInFirstName,
  emptyFirstName,
  loginData,
  invalidEmailFormat,
  invalidLoginData,
  invalidPassword,
  invalidEmail,
  numberInEmail,
  emptyEmail,
  verifyEmail,
  invalidVerifyEmail,
  invalidRole,
  stringInOtp,
  emptyOtp,
  invalidOtp,
  invalidUpdatePassword,
  invalidRoleUpdatePassword,
  invalidEmailUpdatePassword,
  invalidEditData,
  editValidation,
  numberInEditProfile,
  emptyInEditProfile,
  validEditProfile,
  validUpdatePassword,
  validRestPassword,
  emptyCurrentPassword,
  invalidRoleCurrentPassword,
  invalidCurrentPassword,
  roleRegistrationValidation,
  alreadyRegistrationData
} = require('../../integration/envVariable/userVariable');
const { token, expireToken } = require('../../env.json');

describe('POST /api/user/registration', () => {
  it('Should give Validation Error when not pass payload.', async () => {
    const missingPayload = await supertest
      .post('/api/user/registration')
      .send({})
      .expect(400);

    expect(missingPayload.status).eql(400);
    expect(missingPayload.body).to.be.an('object');
    expect(missingPayload.body).to.have.property('status').eql('error');
    expect(missingPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingPayload.body.data).to.have.property('role');
    expect(missingPayload.body.data.role).to.be.an('object');
    expect(missingPayload.body.data.role)
      .to.have.property('message')
      .eql('Role is Required');
  });

  it('Should give Validation Error when role is incorrect in payload.', async () => {
    const incorrectRole = await supertest
      .post('/api/user/registration')
      .send(roleRegistrationValidation)
      .expect(400);

    expect(incorrectRole.status).eql(400);
    expect(incorrectRole.body).to.be.an('object');
    expect(incorrectRole.body).to.have.property('status').eql('error');
    expect(incorrectRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(incorrectRole.body.data).to.have.property('role');
    expect(incorrectRole.body.data.role).to.be.an('object');
    expect(incorrectRole.body.data.role)
      .to.have.property('message')
      .eql(`Role must be 'Users', 'Admin', 'Vendor'`);
  });

  it('Should give Validation Error when first_name is number in payload.', async () => {
    const numberPayload = await supertest
      .post('/api/user/registration')
      .send(numberInFirstName)
      .expect(400);

    expect(numberPayload.status).eql(400);
    expect(numberPayload.body).to.be.an('object');
    expect(numberPayload.body).to.have.property('status').eql('error');
    expect(numberPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(numberPayload.body.data).to.have.property('first_name');
    expect(numberPayload.body.data.first_name).to.be.an('object');
    expect(numberPayload.body.data.first_name)
      .to.have.property('message')
      .eql('First name should be a type of text');
  });

  it('Should give Validation Error when first_name is empty in payload.', async () => {
    const emptyPayload = await supertest
      .post('/api/user/registration')
      .send(emptyFirstName)
      .expect(400);

    expect(emptyPayload.status).eql(400);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('error');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emptyPayload.body.data).to.have.property('first_name');
    expect(emptyPayload.body.data.first_name).to.be.an('object');
    expect(emptyPayload.body.data.first_name)
      .to.have.property('message')
      .eql('First name cannot be an empty field');
  });

  it(`Should give validation error when confirm password doesn't match with password.`, async () => {
    const confirmPassword = await supertest
      .post('/api/user/registration')
      .send(passwordData)
      .expect(400);

    expect(confirmPassword.status).eql(400);
    expect(confirmPassword.body).to.be.an('object');
    expect(confirmPassword.body).to.have.property('status').eql('error');
    expect(confirmPassword.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(confirmPassword.body.data).to.have.property('confirm_password');
    expect(confirmPassword.body.data.confirm_password).to.be.an('object');
    expect(confirmPassword.body.data.confirm_password)
      .to.have.property('message')
      .eql(`Confirm Password doesn't match password`);
  });

  it(`Should give Record Already Exist when record is already exist in db.`, async () => {
    const uniqueData = await supertest
      .post('/api/user/registration')
      .send(alreadyRegistrationData)
      .expect(400);

    expect(uniqueData.status).eql(400);
    expect(uniqueData.body).to.be.an('object');
    expect(uniqueData.body).to.have.property('status').eql('error');
    expect(uniqueData.body)
      .to.have.property('message')
      .eql('Record Already Exist');
    expect(uniqueData.body.stack).to.be.an('object');
    expect(uniqueData.body.stack)
      .to.have.property('code')
      .eql(`E_UNIQUE`);
    expect(uniqueData.body.stack)
      .to.have.property('message')
      .eql(`Would violate uniqueness constraint-- a record already exists with conflicting value(s).`);
  });
});

describe('POST /api/admin/login', () => {
  it('Should give Validation Error when not pass payload.', async () => {
    const missingPayload = await supertest
      .post('/api/admin/login')
      .send({})
      .expect(400);

    expect(missingPayload.status).eql(400);
    expect(missingPayload.body).to.be.an('object');
    expect(missingPayload.body).to.have.property('status').eql('error');
    expect(missingPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingPayload.body.data).to.have.property('email_id');
    expect(missingPayload.body.data.email_id).to.be.an('object');
    expect(missingPayload.body.data.email_id)
      .to.have.property('message')
      .eql('Email is Required');
  });

  it('Should give Validation Error when email id format is incorrect.', async () => {
    const emailFormat = await supertest
      .post('/api/admin/login')
      .send(invalidEmailFormat)
      .expect(400);

    expect(emailFormat.status).eql(400);
    expect(emailFormat.body).to.be.an('object');
    expect(emailFormat.body).to.have.property('status').eql('error');
    expect(emailFormat.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailFormat.body.data).to.have.property('email_id');
    expect(emailFormat.body.data.email_id).to.be.an('object');
    expect(emailFormat.body.data.email_id)
      .to.have.property('message')
      .eql('Email format not valid');
  });

  it(`Should give Validation Error when email_id is empty in payload.`, async () => {
    const emailEmpty = await supertest
      .post('/api/admin/login')
      .send(emptyEmail)
      .expect(400);

    expect(emailEmpty.status).eql(400);
    expect(emailEmpty.body).to.be.an('object');
    expect(emailEmpty.body).to.have.property('status').eql('error');
    expect(emailEmpty.body).to.have.property('message').eql('Validation Error');
    expect(emailEmpty.body.data).to.have.property('email_id');
    expect(emailEmpty.body.data.email_id).to.be.an('object');
    expect(emailEmpty.body.data.email_id)
      .to.have.property('message')
      .eql('Email cannot be an empty field');
  });

  it('Should give Validation Error when email_id is number in payload.', async () => {
    const emailInNumber = await supertest
      .post('/api/admin/login')
      .send(numberInEmail)
      .expect(400);

    expect(emailInNumber.status).eql(400);
    expect(emailInNumber.body).to.be.an('object');
    expect(emailInNumber.body).to.have.property('status').eql('error');
    expect(emailInNumber.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailInNumber.body.data).to.have.property('email_id');
    expect(emailInNumber.body.data.email_id).to.be.an('object');
    expect(emailInNumber.body.data.email_id)
      .to.have.property('message')
      .eql(`Email should be a type of 'text'`);
  });

  it('Should give Validation Error when role is incorrect in payload.', async () => {
    const incorrectRole = await supertest
      .post('/api/admin/login')
      .send(invalidLoginData)
      .expect(400);

    expect(incorrectRole.status).eql(400);
    expect(incorrectRole.body).to.be.an('object');
    expect(incorrectRole.body).to.have.property('status').eql('error');
    expect(incorrectRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(incorrectRole.body.data).to.have.property('role');
    expect(incorrectRole.body.data.role).to.be.an('object');
    expect(incorrectRole.body.data.role)
      .to.have.property('message')
      .eql(`Role must be 'Users', 'Admin', 'Vendor'`);
  });

  it('Should give incorrect username or password when password is incorrect.', async () => {
    const wrongPassword = await supertest
      .post('/api/admin/login')
      .send(invalidPassword)
      .expect(400);

    expect(wrongPassword.status).eql(400);
    expect(wrongPassword.body).to.be.an('object');
    expect(wrongPassword.body).to.have.property('status').eql('error');
    expect(wrongPassword.body)
      .to.have.property('message')
      .eql('Incorrect username or password');
  });

  it(`Should give email doesn't exist when email is not present in db.`, async () => {
    const emailInvalid = await supertest
      .post('/api/admin/login')
      .send(invalidEmail)
      .expect(404);

    expect(emailInvalid.status).eql(404);
    expect(emailInvalid.body).to.be.an('object');
    expect(emailInvalid.body).to.have.property('status').eql('error');
    expect(emailInvalid.body)
      .to.have.property('message')
      .eql(`User with this email doesn't exist.`);
  });
});

describe('POST /api/user/verifyEmail', () => {
  it('Should give Validation Error when not pass payload.', async () => {
    const missingPayload = await supertest
      .post('/api/user/verifyEmail')
      .send({})
      .expect(400);

    expect(missingPayload.status).eql(400);
    expect(missingPayload.body).to.be.an('object');
    expect(missingPayload.body).to.have.property('status').eql('error');
    expect(missingPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingPayload.body.data).to.have.property('email_id');
    expect(missingPayload.body.data.email_id).to.be.an('object');
    expect(missingPayload.body.data.email_id)
      .to.have.property('message')
      .eql('Email is Required');
  });

  it('Should give Validation Error when email id format is incorrect.', async () => {
    const emailFormat = await supertest
      .post('/api/user/verifyEmail')
      .send(invalidEmailFormat)
      .expect(400);

    expect(emailFormat.status).eql(400);
    expect(emailFormat.body).to.be.an('object');
    expect(emailFormat.body).to.have.property('status').eql('error');
    expect(emailFormat.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailFormat.body.data).to.have.property('email_id');
    expect(emailFormat.body.data.email_id).to.be.an('object');
    expect(emailFormat.body.data.email_id)
      .to.have.property('message')
      .eql('Email format not valid');
  });

  it('Should give Validation Error when email_id is empty in payload.', async () => {
    const emailEmpty = await supertest
      .post('/api/user/verifyEmail')
      .send(emptyEmail)
      .expect(400);

    expect(emailEmpty.status).eql(400);
    expect(emailEmpty.body).to.be.an('object');
    expect(emailEmpty.body).to.have.property('status').eql('error');
    expect(emailEmpty.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailEmpty.body.data).to.have.property('email_id');
    expect(emailEmpty.body.data.email_id).to.be.an('object');
    expect(emailEmpty.body.data.email_id)
      .to.have.property('message')
      .eql('Email cannot be an empty field');
  });

  it('Should give Validation Error when email_id is number in payload.', async () => {
    const emailInNumber = await supertest
      .post('/api/user/verifyEmail')
      .send(numberInEmail)
      .expect(400);

    expect(emailInNumber.status).eql(400);
    expect(emailInNumber.body).to.be.an('object');
    expect(emailInNumber.body).to.have.property('status').eql('error');
    expect(emailInNumber.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailInNumber.body.data).to.have.property('email_id');
    expect(emailInNumber.body.data.email_id).to.be.an('object');
    expect(emailInNumber.body.data.email_id)
      .to.have.property('message')
      .eql(`Email should be a type of 'text'`);
  });

  it('Should give Validation Error when role is incorrect in payload.', async () => {
    const incorrectRole = await supertest
      .post('/api/user/verifyEmail')
      .send(invalidRole)
      .expect(400);

    expect(incorrectRole.status).eql(400);
    expect(incorrectRole.body).to.be.an('object');
    expect(incorrectRole.body).to.have.property('status').eql('error');
    expect(incorrectRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(incorrectRole.body.data).to.have.property('role');
    expect(incorrectRole.body.data.role).to.be.an('object');
    expect(incorrectRole.body.data.role)
      .to.have.property('message')
      .eql(`Role must be 'Users', 'Vendor'`);
  });

  it(`Should give email doesn't exist when email is not present in db.`, async () => {
    const missingEmail = await supertest
      .post('/api/user/verifyEmail')
      .send(invalidVerifyEmail)
      .expect(404);

    expect(missingEmail.status).eql(404);
    expect(missingEmail.body).to.be.an('object');
    expect(missingEmail.body).to.have.property('status').eql('error');
    expect(missingEmail.body)
      .to.have.property('message')
      .eql(`User with this email doesn't exist.`);
  });
});

describe('POST /api/user/verifyOtp', () => {
  it('Should give Validation Error when not pass payload.', async () => {
    const missingPayload = await supertest
      .post('/api/user/verifyOtp')
      .send({})
      .expect(400);

    expect(missingPayload.status).eql(400);
    expect(missingPayload.body).to.be.an('object');
    expect(missingPayload.body).to.have.property('status').eql('error');
    expect(missingPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingPayload.body.data).to.have.property('otp');
    expect(missingPayload.body.data.otp).to.be.an('object');
    expect(missingPayload.body.data.otp)
      .to.have.property('message')
      .eql('Otp is Required');
  });

  it('Should give Validation Error when otp is string in payload.', async () => {
    const otpInString = await supertest
      .post('/api/user/verifyOtp')
      .send(stringInOtp)
      .expect(400);

    expect(otpInString.status).eql(400);
    expect(otpInString.body).to.be.an('object');
    expect(otpInString.body).to.have.property('status').eql('error');
    expect(otpInString.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(otpInString.body.data).to.have.property('otp');
    expect(otpInString.body.data.otp).to.be.an('object');
    expect(otpInString.body.data.otp)
      .to.have.property('message')
      .eql('Otp should be a type of number');
  });

  it('Should give Validation Error when otp is empty in payload.', async () => {
    const otpEmpty = await supertest
      .post('/api/user/verifyOtp')
      .send(emptyOtp)
      .expect(400);

    expect(otpEmpty.status).eql(400);
    expect(otpEmpty.body).to.be.an('object');
    expect(otpEmpty.body).to.have.property('status').eql('error');
    expect(otpEmpty.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(otpEmpty.body.data).to.have.property('otp');
    expect(otpEmpty.body.data.otp).to.be.an('object');
    expect(otpEmpty.body.data.otp)
      .to.have.property('message')
      .eql('Otp should be a type of number');
  });

  it('Should give Please enter correct otp when otp is incorrect.', async () => {
    const incorrectOtp = await supertest
      .post('/api/user/verifyOtp')
      .send(invalidOtp)
      .expect(200);

    expect(incorrectOtp.status).eql(200);
    expect(incorrectOtp.body).to.be.an('object');
    expect(incorrectOtp.body).to.have.property('status').eql('error');
    expect(incorrectOtp.body)
      .to.have.property('message')
      .eql('Please enter correct OTP');
  });
});

describe('PUT /api/user/updatePassword', () => {
  it('Should give Validation Error when not pass payload.', async () => {
    const missingPayload = await supertest
      .put('/api/user/updatePassword')
      .send({})
      .expect(400);

    expect(missingPayload.status).eql(400);
    expect(missingPayload.body).to.be.an('object');
    expect(missingPayload.body).to.have.property('status').eql('error');
    expect(missingPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(missingPayload.body.data).to.have.property('email_id');
    expect(missingPayload.body.data.email_id).to.be.an('object');
    expect(missingPayload.body.data.email_id)
      .to.have.property('message')
      .eql('Email is Required');
  });

  it('Should give Validation Error when email id format is incorrect.', async () => {
    const emailFormat = await supertest
      .put('/api/user/updatePassword')
      .send(invalidEmailFormat)
      .expect(400);

    expect(emailFormat.status).eql(400);
    expect(emailFormat.body).to.be.an('object');
    expect(emailFormat.body).to.have.property('status').eql('error');
    expect(emailFormat.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailFormat.body.data).to.have.property('email_id');
    expect(emailFormat.body.data.email_id).to.be.an('object');
    expect(emailFormat.body.data.email_id)
      .to.have.property('message')
      .eql('Email format not valid');
  });

  it('Should give Validation Error when email_id is empty in payload.', async () => {
    const emailEmpty = await supertest
      .put('/api/user/updatePassword')
      .send(emptyEmail)
      .expect(400);

    expect(emailEmpty.status).eql(400);
    expect(emailEmpty.body).to.be.an('object');
    expect(emailEmpty.body).to.have.property('status').eql('error');
    expect(emailEmpty.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailEmpty.body.data).to.have.property('email_id');
    expect(emailEmpty.body.data.email_id).to.be.an('object');
    expect(emailEmpty.body.data.email_id)
      .to.have.property('message')
      .eql('Email cannot be an empty field');
  });

  it('Should give Validation Error when email_id is number in payload.', async () => {
    const incorrectEmail = await supertest
      .put('/api/user/updatePassword')
      .send(numberInEmail)
      .expect(400);

    expect(incorrectEmail.status).eql(400);
    expect(incorrectEmail.body).to.be.an('object');
    expect(incorrectEmail.body).to.have.property('status').eql('error');
    expect(incorrectEmail.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(incorrectEmail.body.data).to.have.property('email_id');
    expect(incorrectEmail.body.data.email_id).to.be.an('object');
    expect(incorrectEmail.body.data.email_id)
      .to.have.property('message')
      .eql(`Email should be a type of 'text'`);
  });

  it(`Should give validation error when confirm password doesn't match with password.`, async () => {
    const wrongPassword = await supertest
      .put('/api/user/updatePassword')
      .send(invalidUpdatePassword)
      .expect(400);

    expect(wrongPassword.status).eql(400);
    expect(wrongPassword.body).to.be.an('object');
    expect(wrongPassword.body).to.have.property('status').eql('error');
    expect(wrongPassword.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(wrongPassword.body.data).to.have.property('confirm_password');
    expect(wrongPassword.body.data.confirm_password).to.be.an('object');
    expect(wrongPassword.body.data.confirm_password)
      .to.have.property('message')
      .eql(`Confirm Password doesn't match password`);
  });

  it('Should give Validation Error when role is incorrect in payload.', async () => {
    const invalidRole = await supertest
      .put('/api/user/updatePassword')
      .send(invalidRoleUpdatePassword)
      .expect(400);

    expect(invalidRole.status).eql(400);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidRole.body.data).to.have.property('role');
    expect(invalidRole.body.data.role).to.be.an('object');
    expect(invalidRole.body.data.role)
      .to.have.property('message')
      .eql(`Role must be 'Users', 'Vendor'`);
  });

  it('Should give your email is not registered when email_id is not present in db.', async () => {
    const invalidEmail = await supertest
      .put('/api/user/updatePassword')
      .send(invalidEmailUpdatePassword)
      .expect(200);

    expect(invalidEmail.status).eql(200);
    expect(invalidEmail.body).to.be.an('object');
    expect(invalidEmail.body).to.have.property('status').eql('error');
    expect(invalidEmail.body)
      .to.have.property('message')
      .eql(`Your email is not registered`);
  });
});

describe('PUT /api/user/editProfile/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/user/editProfile/78')
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
      .put('/api/user/editProfile/78')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give Validation Error when email id format is incorrect.', async () => {
    const emailFormat = await supertest
      .put('/api/user/updatePassword')
      .send(invalidEmailFormat)
      .expect(400);

    expect(emailFormat.status).eql(400);
    expect(emailFormat.body).to.be.an('object');
    expect(emailFormat.body).to.have.property('status').eql('error');
    expect(emailFormat.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailFormat.body.data).to.have.property('email_id');
    expect(emailFormat.body.data.email_id).to.be.an('object');
    expect(emailFormat.body.data.email_id)
      .to.have.property('message')
      .eql('Email format not valid');
  });

  it(`Should give Validation Error when id is string in params.`, async () => {
    const invalidRole = await supertest
      .put('/api/user/editProfile/dgdfgd')
      .set('authorization', token)
      .expect(400);

    expect(invalidRole.status).eql(400);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidRole.body.data).to.have.property('id');
    expect(invalidRole.body.data.id).to.be.an('object');
    expect(invalidRole.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it(`Should give validation error when not pass payload.`, async () => {
    const invalidRole = await supertest
      .put('/api/user/editProfile/78')
      .set('authorization', token)
      .send({})
      .expect(400);

    expect(invalidRole.status).eql(400);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidRole.body.data).to.have.property('role');
    expect(invalidRole.body.data.role).to.be.an('object');
    expect(invalidRole.body.data.role)
      .to.have.property('message')
      .eql('Role is Required');
  });

  it('Should give Validation Error when role is incorrect in payload.', async () => {
    const invalidRole = await supertest
      .put('/api/user/editProfile/78')
      .set('authorization', token)
      .send(invalidEditData)
      .expect(400);

    expect(invalidRole.status).eql(400);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidRole.body.data).to.have.property('role');
    expect(invalidRole.body.data.role).to.be.an('object');
    expect(invalidRole.body.data.role)
      .to.have.property('message')
      .eql(`Role must be 'Users', 'Admin', 'Vendor'`);
  });

  it('Should give Validation Error when email id format is incorrect.', async () => {
    const invalidRole = await supertest
      .put('/api/user/editProfile/78')
      .set('authorization', token)
      .send(editValidation)
      .expect(400);

    expect(invalidRole.status).eql(400);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidRole.body.data).to.have.property('email_id');
    expect(invalidRole.body.data.email_id).to.be.an('object');
    expect(invalidRole.body.data.email_id)
      .to.have.property('message')
      .eql('Email format not valid');
  });

  it('Should give Validation Error when email id is empty in payload.', async () => {
    const invalidRole = await supertest
      .put('/api/user/editProfile/78')
      .set('authorization', token)
      .send(emptyInEditProfile)
      .expect(400);

    expect(invalidRole.status).eql(400);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidRole.body.data).to.have.property('email_id');
    expect(invalidRole.body.data.email_id).to.be.an('object');
    expect(invalidRole.body.data.email_id)
      .to.have.property('message')
      .eql('Email cannot be an empty field');
  });

  it('Should give Validation Error when email_id is number in payload.', async () => {
    const invalidRole = await supertest
      .put('/api/user/editProfile/78')
      .set('authorization', token)
      .send(numberInEditProfile)
      .expect(400);

    expect(invalidRole.status).eql(400);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidRole.body.data).to.have.property('email_id');
    expect(invalidRole.body.data.email_id).to.be.an('object');
    expect(invalidRole.body.data.email_id)
      .to.have.property('message')
      .eql(`Email should be a type of 'text'`);
  });

  it('Should give Data not found when id is not present in db.', async () => {
    const invalidRole = await supertest
      .put('/api/user/editProfile/1000')
      .set('authorization', token)
      .send(validEditProfile)
      .expect(200);

    expect(invalidRole.status).eql(200);
    expect(invalidRole.body).to.be.an('object');
    expect(invalidRole.body).to.have.property('status').eql('error');
    expect(invalidRole.body)
      .to.have.property('message')
      .eql('Data not found.');
  });
});

describe('GET /api/user/viewProfile/:id/:role', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .get('/api/user/viewProfile/78/Users')
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
      .get('/api/user/viewProfile/78/Users')
      .set('authorization', expireToken)
      .expect(401);

    expect(expireAccessToken.status).eql(401);
    expect(expireAccessToken.body).to.be.an('object');
    expect(expireAccessToken.body).to.have.property('status').eql('error');
    expect(expireAccessToken.body)
      .to.have.property('message')
      .eql('Token expired');
  });

  it('Should give Validation Error when id is string in params.', async () => {
    const emailFormat = await supertest
      .get('/api/user/viewProfile/dsd/Users')
      .set('authorization', token)
      .expect(400);

    expect(emailFormat.status).eql(400);
    expect(emailFormat.body).to.be.an('object');
    expect(emailFormat.body).to.have.property('status').eql('error');
    expect(emailFormat.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailFormat.body.data).to.have.property('id');
    expect(emailFormat.body.data.id).to.be.an('object');
    expect(emailFormat.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give Validation Error when role is incorrect in params.', async () => {
    const emailFormat = await supertest
      .get('/api/user/viewProfile/78/sddsd')
      .set('authorization', token)
      .expect(400);

    expect(emailFormat.status).eql(400);
    expect(emailFormat.body).to.be.an('object');
    expect(emailFormat.body).to.have.property('status').eql('error');
    expect(emailFormat.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emailFormat.body.data).to.have.property('role');
    expect(emailFormat.body.data.role).to.be.an('object');
    expect(emailFormat.body.data.role)
      .to.have.property('message')
      .eql(`Role must be 'Users', 'Admin', 'Vendor'`);
  });

  it('Should give id not found when id is not present in db.', async () => {
    const emailFormat = await supertest
      .get('/api/user/viewProfile/1000/Users')
      .set('authorization', token)
      .expect(200);

    expect(emailFormat.status).eql(200);
    expect(emailFormat.body).to.be.an('object');
    expect(emailFormat.body).to.have.property('status').eql('error');
    expect(emailFormat.body)
      .to.have.property('message')
      .eql('Id not found');
  });
})

describe('PUT /api/user/resetPassword/:id', () => {
  it('Should give authorization header is missing when not pass token in header.', async () => {
    const missingToken = await supertest
      .put('/api/user/resetPassword/80')
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
      .put('/api/user/resetPassword/80')
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
      .put('/api/user/resetPassword/80')
      .set('authorization', token)
      .send({})
      .expect(400);

    expect(emptyPayload.status).eql(400);
    expect(emptyPayload.body).to.be.an('object');
    expect(emptyPayload.body).to.have.property('status').eql('error');
    expect(emptyPayload.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emptyPayload.body.data).to.have.property('current_password');
    expect(emptyPayload.body.data.current_password).to.be.an('object');
    expect(emptyPayload.body.data.current_password)
      .to.have.property('message')
      .eql('Password is Required');
  });

  it('Should give Validation Error when password is empty in payload.', async () => {
    const emptyPassword = await supertest
      .put('/api/user/resetPassword/80')
      .set('authorization', token)
      .send(emptyCurrentPassword)
      .expect(400);

    expect(emptyPassword.status).eql(400);
    expect(emptyPassword.body).to.be.an('object');
    expect(emptyPassword.body).to.have.property('status').eql('error');
    expect(emptyPassword.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(emptyPassword.body.data).to.have.property('current_password');
    expect(emptyPassword.body.data.current_password).to.be.an('object');
    expect(emptyPassword.body.data.current_password)
      .to.have.property('message')
      .eql('Password cannot be an empty field');
  });

  it('Should give Validation Error when role is incorrect in payload.', async () => {
    const incorrectRole = await supertest
      .put('/api/user/resetPassword/80')      
      .set('authorization', token)
      .send(invalidRoleCurrentPassword)
      .expect(400);

    expect(incorrectRole.status).eql(400);
    expect(incorrectRole.body).to.be.an('object');
    expect(incorrectRole.body).to.have.property('status').eql('error');
    expect(incorrectRole.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(incorrectRole.body.data).to.have.property('role');
    expect(incorrectRole.body.data.role).to.be.an('object');
    expect(incorrectRole.body.data.role)
      .to.have.property('message')
      .eql(`Role must be 'Users', 'Vendor'`);
  });

  it('Should give Validation Error when id is string in params.', async () => {
    const invalidId = await supertest
      .put('/api/user/resetPassword/dssdf')      
      .set('authorization', token)
      .send(validRestPassword)
      .expect(400);

    expect(invalidId.status).eql(400);
    expect(invalidId.body).to.be.an('object');
    expect(invalidId.body).to.have.property('status').eql('error');
    expect(invalidId.body)
      .to.have.property('message')
      .eql('Validation Error');
    expect(invalidId.body.data).to.have.property('id');
    expect(invalidId.body.data.id).to.be.an('object');
    expect(invalidId.body.data.id)
      .to.have.property('message')
      .eql('Id should be a type of number');
  });

  it('Should give please enter the correct password when current_password is incorrect in payload.', async () => {
    const invalidPassword = await supertest
      .put('/api/user/resetPassword/80')      
      .set('authorization', token)
      .send(invalidCurrentPassword)
      .expect(404);

    expect(invalidPassword.status).eql(404);
    expect(invalidPassword.body).to.be.an('object');
    expect(invalidPassword.body).to.have.property('status').eql('error');
    expect(invalidPassword.body)
      .to.have.property('message')
      .eql('Please enter the correct password');
  });

  it('Should give Data not found when id is not present in db.', async () => {
    const idNotFound = await supertest
      .put('/api/user/resetPassword/800')      
      .set('authorization', token)
      .send(validRestPassword)
      .expect(200);

    expect(idNotFound.status).eql(200);
    expect(idNotFound.body).to.be.an('object');
    expect(idNotFound.body).to.have.property('status').eql('error');
    expect(idNotFound.body)
      .to.have.property('message')
      .eql('Data not found.');
  });
})

describe('POST, GET', () => {
  let id = null;
  let otp = null;

  it('Should give allows user to change password and reset password and add and get their user.', async () => {
    // registration
    sinon.stub(userController, 'signup').resolves(200);
    const userData = await supertest
      .post('/api/user/registration')
      .send(registrationData)
      .expect(200);

    expect(userData.status).eql(200);
    expect(userData.body).to.be.an('object');

    expect(userData.body).to.have.property('status').eql('success');
    expect(userData.body)
      .to.have.property('message')
      .eql('Congratulation! You are registered successfully.');

    //login
    sinon.stub(userController, 'login').resolves(200);
    const loginDetails = await supertest
      .post('/api/admin/login')
      .send(loginData)
      .expect(200);

    expect(loginDetails.status).eql(200);
    expect(loginDetails.body).to.be.an('object');

    expect(loginDetails.body).to.have.property('status').eql('success');
    expect(loginDetails.body)
      .to.have.property('message')
      .eql('You are login successfully.');
    expect(loginDetails.body)
      .to.have.property('message')
      .eql('You are login successfully.');
    expect(loginDetails.body).to.have.property('data');
    expect(loginDetails.body.data).to.be.an('object');
    expect(loginDetails.body.data).to.have.property('id');
    expect(loginDetails.body.data).to.have.property('token');

    id = loginDetails.body.data.id

    //verifyEmail
    sinon.stub(userController, 'verifyEmail').resolves(200);
    const sendEmail = await supertest
      .post('/api/user/verifyEmail')
      .send(verifyEmail)
      .expect(200);

    expect(sendEmail.status).eql(200);
    expect(sendEmail.body).to.be.an('object');
    expect(sendEmail.body).to.have.property('status').eql('success');
    expect(sendEmail.body)
      .to.have.property('message')
      .eql('Email sent successfully.');
    
    otp = sendEmail.body.data.otp;

    //verifyOtp
    sinon.stub(userController, 'verifyOtp').resolves(200);
    const verifyOtp = await supertest
      .post('/api/user/verifyOtp')
      .send({otp})
      .expect(200);

    expect(verifyOtp.status).eql(200);
    expect(verifyOtp.body).to.be.an('object');
    expect(verifyOtp.body).to.have.property('status').eql('success');
    expect(verifyOtp.body)
      .to.have.property('message')
      .eql('OTP verified');
    
    //updatePassword
    sinon.stub(userController, 'updatePassword').resolves(200);
    const updatePassword = await supertest
      .put('/api/user/updatePassword')
      .send(validUpdatePassword)
      .expect(200);

    expect(updatePassword.status).eql(200);
    expect(updatePassword.body).to.be.an('object');
    expect(updatePassword.body).to.have.property('status').eql('success');
    expect(updatePassword.body)
      .to.have.property('message')
      .eql('Your password is updated successfully.');
    
    //editProfile
    sinon.stub(userController, 'editProfile').resolves(200);
    const editProfile = await supertest
      .put(`/api/user/editProfile/${id}`)
      .set('authorization', token)
      .send(validEditProfile)
      .expect(200);

    expect(editProfile.status).eql(200);
    expect(editProfile.body).to.be.an('object');
    expect(editProfile.body).to.have.property('status').eql('success');
    expect(editProfile.body)
      .to.have.property('message')
      .eql('Your profile is updated successfully.');

    //viewProfile
    sinon.stub(userController, 'viewProfile').resolves(200);
    const viewProfile = await supertest
      .get(`/api/user/viewProfile/${id}/Users`)
      .set('authorization', token)
      .expect(200);

    expect(viewProfile.status).eql(200);
    expect(viewProfile.body).to.be.an('object');
    expect(viewProfile.body).to.have.property('status').eql('success');
    expect(viewProfile.body)
      .to.have.property('message')
      .eql('Your profile getting successfully.');
    expect(viewProfile.body).to.have.property('data');
    expect(viewProfile.body.data).to.be.an('object');
    expect(viewProfile.body.data).to.have.property('id');
    expect(viewProfile.body.data).to.have.property('is_archived');

    //resetPassword
    sinon.stub(userController, 'resetPassword').resolves(200);
    const resetPassword = await supertest
      .put(`/api/user/resetPassword/${id}`)
      .set('authorization', token)
      .send(validRestPassword)
      .expect(200);

    expect(resetPassword.status).eql(200);
    expect(resetPassword.body).to.be.an('object');
    expect(resetPassword.body).to.have.property('status').eql('success');
    expect(resetPassword.body)
      .to.have.property('message')
      .eql('Your password is updated successfully.');
  });
});
