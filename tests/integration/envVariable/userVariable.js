module.exports = {
  registrationData: {
    role             : 'Users',
    last_name        : 'Patel',
    first_name       : 'kaushik',
    email_id         : 'demo9335123452452345@gmail.com',
    password         : 'Ravi+123',
    confirm_password : 'Ravi+123',
    dob              : '1999-10-29',
    gender           : 'male',
    phone_no         : '9797979797',
    country_id       : '1',
    state_id         : '1',
    city_id          : '1',
    address_line_1   : 'NaranPura',
    address_line_2   : 'Sola road',
    zip_code         : 380063,
  },
  alreadyRegistrationData: {
    role             : 'Users',
    last_name        : 'Patel',
    first_name       : 'kaushik',
    email_id         : 'demo933512345245@gmail.com',
    password         : 'Ravi+123',
    confirm_password : 'Ravi+123',
    dob              : '1999-10-29',
    gender           : 'male',
    phone_no         : '9797979797',
    country_id       : '1',
    state_id         : '1',
    city_id          : '1',
    address_line_1   : 'NaranPura',
    address_line_2   : 'Sola road',
    zip_code         : 380063,
  },
  passwordData: {
    role             : 'Users',
    last_name        : 'Patel',
    first_name       : 'kaushik',
    email_id         : 'demo933512345213@gmail.com',
    password         : 'Ravi+123',
    confirm_password : 'Ravi+23',
    dob              : '1999-10-29',
    gender           : 'male',
    phone_no         : '9797979797',
    country_id       : '1',
    state_id         : '1',
    city_id          : '1',
    address_line_1   : 'NaranPura',
    address_line_2   : 'Sola road',
    zip_code         : 380063,
  },
  numberInFirstName: {
    role       : 'Users',
    first_name : 582,
  },
  roleRegistrationValidation: {
    role : 'Ravi'
  },
  emptyFirstName: {
    role       : 'Users',
    first_name : '',
  },
  loginData: {
    email_id : 'prajapatiravi.shivinfotech@gmail.com',
    password : 'Ravi@123',
    role     : 'Users',
  },
  invalidLoginData: {
    email_id : 'demo933512345@gmail.com',
    password : 'Ravi+123',
    role     : 'Ravi',
  },
  invalidPassword: {
    email_id : 'prajapatiravi.shivinfotech@gmail.com',
    password : 'Ravi+1233',
    role     : 'Users',
  },
  invalidEmail: {
    email_id : 'demo9335123455@gmail.com',
    password : 'Ravi+123',
    role     : 'Users',
  },
  emptyEmail: {
    email_id : '',
  },
  invalidEmailFormat: {
    email_id : 'prajapati.com',
  },
  numberInEmail: {
    email_id : 123,
  },
  verifyEmail: {
    email_id : 'user123@gmail.com',
    role     : 'Users',
  },
  invalidVerifyEmail: {
    email_id : 'prajapatiravi1.shivinfotech@gmail.com',
    role     : 'Users',
  },
  invalidRole: {
    email_id : 'prajapatiravi.shivinfotech@gmail.com',
    role     : 'Ravi',
  },
  stringInOtp: {
    otp : 'Ravi',
  },
  invalidOtp: {
    otp : 98765,
  },
  emptyOtp: {
    otp : ' ',
  },
  validOtp: {
    otp : 663623,
  },
  validUpdatePassword: {
    email_id         : 'prajapatiravi.shivinfotech@gmail.com',
    password         : 'Ravi@123',
    confirm_password : 'Ravi@123',
    role             : 'Users',
  },
  invalidUpdatePassword: {
    email_id         : 'demo933512345@gmail.com',
    password         : 'Ravi+123',
    confirm_password : 'Ravi++123',
    role             : 'Users',
  },
  invalidRoleUpdatePassword: {
    email_id         : 'demo933512345@gmail.com',
    password         : 'Ravi+123',
    confirm_password : 'Ravi+123',
    role             : 'Ravi',
  },
  invalidEmailUpdatePassword: {
    email_id         : 'demo93351234532@gmail.com',
    password         : 'Ravi+123',
    confirm_password : 'Ravi+123',
    role             : 'Users',
  },
  validEmailUpdatePassword: {
    email_id         : 'demo9335@gmail.com',
    password         : 'Ravi+123',
    confirm_password : 'Ravi+123',
    role             : 'Users',
  },
  editData: {
    role : 'Users',
  },
  invalidEditData: {
    role : 'Ravi',
  },
  editValidation: {
    role     : 'Users',
    email_id : 'dsf',
  },
  numberInEditProfile: {
   role     : 'Users',
   email_id : 334543
  },
  emptyInEditProfile: {
    role     : 'Users',
    email_id : ''
  },
  validEditProfile: {
    role       : 'Users',
    first_name : 'Ravi'
  },
  validRestPassword: {
    current_password: 'Ravi@123',
    password : 'Ravi@123',
    role : 'Users'
  },
  emptyCurrentPassword: {
    current_password: '',
    password : 'Ravi@123',
    role : 'Users'
  },
  invalidRoleCurrentPassword: {
    current_password: 'Ravi@123',
    password : 'Ravi@123',
    role : 'Ravi'
  },
  invalidCurrentPassword: {
    current_password: 'Ravi',
    password : 'Ravi@123',
    role : 'Users'
  }
};
