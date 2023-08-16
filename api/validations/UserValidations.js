/* eslint-disable camelcase */
const Joi = require('joi');
const Moment = require('moment');
const Today = Moment().format('YYYY-MM-DD');

module.exports = {
  userSignup: Joi.object().keys({
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Admin', 'Vendor'`,
    }),
    first_name: Joi.string().optional().messages({
      'string.base'  : `First name should be a type of text`,
    }),
    last_name: Joi.string().optional().messages({
      'string.base'  : `Last name should be a type of text`,
    }),
    email_id: Joi.string().required().empty().email().messages({
      'string.base'  : `Email should be a type of 'text'`,
      'string.empty' : `Email cannot be an empty field`,
      'string.email' : `Email format not valid`,
      'any.required' : `Email is Required`,
    }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"])[A-Za-z\d@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"]{8,}$/,
      'password').empty().required().messages({
      'string.base'         : `Password should be a type of 'text'`,
      'string.empty'        : `Password cannot be an empty field`,
      'any.required'        : `Password is Required`,
      'string.pattern.name' : 'Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.'
    }),
    confirm_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"])[A-Za-z\d@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"]{8,}$/,
      'confirm password').empty().required().valid(Joi.ref('password')).messages({
      'string.base'         : `Confirm Password should be a type of text`,
      'string.empty'        : 'Confirm Password is not allowed to be empty',
      'any.required'        : `Confirm Password is Required`,
      'any.only'            : `Confirm Password doesn't match password`,
      'string.pattern.name' : `Confirm Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.`
    }),
    dob: Joi.date().optional().max(Today).allow(null).messages({
      'date.base'    : `Date of birth format not valid`,
      'date.max'     : `Date of birth of can't be greater then today's date`,
    }),
    gender: Joi.string().optional().valid('male', 'female', 'other').messages({
      'string.base'   : `Gender should be a type of 'text'`,
      'any.only'      : `Gender must be 'male', 'female', 'other'`,
    }),
    phone_no: Joi.string().length(10).pattern(/^[0-9]+$/).optional().messages({
      'string.empty' : `Phone number cannot be an empty field`,
      'string.length': `Phone number should be a 10 Number`,
    }),
    country_id: Joi.number().optional().messages({
      'number.base'  : `Country id should be a type of number`,
    }),
    state_id: Joi.number().optional().messages({
      'number.base'  : `State id should be a type of number`,
    }),
    city_id: Joi.number().optional().messages({
      'number.base'  : `City id should be a type of number`,
    }),
    referral_code: Joi.string().optional().messages({
      'string.base'  : `Referral code should be a type of text`,
    }),
    address_line_1: Joi.string().optional().messages({
      'string.base'  : `Address Line 1 should be a type of text`,
    }),
    address_line_2: Joi.string().optional().messages({
      'string.base'  : `Address Line 2 should be a type of text`,
    }),
    zip_code: Joi.number().optional().messages({
      'number.base'  : `Zip code should be a type of number`,
    }),
  }),

  roleValidation: Joi.object().keys({
    role: Joi.string().empty().required().valid('Users', 'Admin', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Admin', 'Vendor'`,
    }),
  }),

  vendorSignup: Joi.object().keys({
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Admin', 'Vendor'`,
    }),
    first_name: Joi.string().optional().messages({
      'string.base'  : `First name should be a type of text`,
    }),
    last_name: Joi.string().optional().messages({
      'string.base'  : `Last name should be a type of text`,
    }),
    dob: Joi.date().required().max(Today).messages({
      'date.empty'   : `Date of birth cannot be an empty field`,
      'date.base'    : `Date of birth format not valid`,
      'date.max'     : `Date of birth of can't be greater then today's date`,
      'any.required' : `Date of birth is Required`,
    }),
    gender: Joi.string().empty().required().valid('male', 'female', 'other').messages({
      'string.empty'  : `Gender cannot be an empty field`,
      'any.only'      : `Gender must be 'male', 'female', 'other'`,
      'string.gender' : `Gender format not valid`,
      'any.required'  : `Gender is Required`,
    }),
    phone_no: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
      'string.empty' : `Phone number cannot be an empty field`,
      'any.required' : `Phone number is Required`,
      'string.length': `Phone number should be a 10 Number`,
    }),
    address: Joi.string().required().empty().messages({
      'string.base'  : `Address should be a type of text`,
      'string.empty' : `Address cannot be an empty field`,
      'any.required' : `Address is Required`,
    }),
    email_id: Joi.string().required().empty().email().messages({
      'string.base'  : `Email should be a type of 'text'`,
      'string.empty' : `Email cannot be an empty field`,
      'string.email' : `Email format not valid`,
      'any.required' : `Email is Required`,
    }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"])[A-Za-z\d@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"]{8,}$/,
      'password').empty().required().messages({
      'string.base'         : `Password should be a type of 'text'`,
      'string.empty'        : `Password cannot be an empty field`,
      'any.required'        : `Password is Required`,
      'string.pattern.name' : 'Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.'
    }),
    confirm_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"])[A-Za-z\d@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"]{8,}$/,
      'confirm password').empty().required().valid(Joi.ref('password')).messages({
      'string.base'         : `Confirm Password should be a type of text`,
      'string.empty'        : 'Confirm Password is not allowed to be empty',
      'any.required'        : `Confirm Password is Required`,
      'any.only'            : `Confirm Password doesn't match password`,
      'string.pattern.name' : `Confirm Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.`
    }),
    company_name: Joi.string().optional().messages({
      'string.base'  : `Company Name should be a type of text`,
    }),
    country_id: Joi.number().optional().messages({
      'number.base'  : `Country id should be a type of number`,
    }),
    state_id: Joi.number().optional().messages({
      'number.base'  : `State id should be a type of number`,
    }),
    city_id: Joi.number().optional().messages({
      'number.base'  : `City id should be a type of number`,
    }),
    zip_code: Joi.number().optional().messages({
      'number.base'  : `Zip code should be a type of number`,
    }),
    is_kyc: Joi.boolean().optional().messages({
      'boolean.base'  : `Is kyc should be a type of boolean`,
    }),
  }),

  login: Joi.object().keys({
    email_id: Joi.string().required().empty().email().messages({
      'string.base'  : `Email should be a type of 'text'`,
      'string.empty' : `Email cannot be an empty field`,
      'string.email' : `Email format not valid`,
      'any.required' : `Email is Required`,
    }),
    password: Joi.string().empty().required().messages({
      'string.base'  : `Password should be a type of 'text'`,
      'string.empty' : `Password cannot be an empty field`,
      'any.required' : `Password is Required`,
    }),
    role: Joi.string().empty().required().valid('Users', 'Admin', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Admin', 'Vendor'`,
    }),
  }),

  verifyEmail: Joi.object().keys({
    email_id: Joi.string().required().empty().email().messages({
      'string.base'  : `Email should be a type of 'text'`,
      'string.empty' : `Email cannot be an empty field`,
      'string.email' : `Email format not valid`,
      'any.required' : `Email is Required`,
    }),
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Vendor'`,
    }),
  }),

  verifyOtp: Joi.object().keys({
    otp: Joi.number().empty().required().messages({
      'number.base'  : `Otp should be a type of number`,
      'number.empty' : 'Otp is not allowed to be empty',
      'any.required' : `Otp is Required`,
    }),
  }),

  updatePassword: Joi.object().keys({
    email_id: Joi.string().required().empty().email().messages({
      'string.base'  : `Email should be a type of 'text'`,
      'string.empty' : `Email cannot be an empty field`,
      'string.email' : `Email format not valid`,
      'any.required' : `Email is Required`,
    }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"])[A-Za-z\d@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"]{8,}$/,
    'password').empty().required().messages({
      'string.base'         : `Password should be a type of 'text'`,
      'string.empty'        : `Password cannot be an empty field`,
      'any.required'        : `Password is Required`,
      'string.pattern.name' : 'Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.'
    }),
    confirm_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"])[A-Za-z\d@$!%*?&#"\'()*+,-./:;<=>?@[\]^_`"]{8,}$/,
      'confirm_password').empty().required().valid(Joi.ref('password')).messages({
      'string.base'         : `Confirm Password should be a type of text`,
      'string.empty'        : 'Confirm Password is not allowed to be empty',
      'any.required'        : `Confirm Password is Required`,
      'any.only'            : `Confirm Password doesn't match password`,
      'string.pattern.name' : `Confirm Password must contain a capital letter, a special character and a digit. Password length must be minimum 8 characters.`
    }),
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Vendor'`,
    }),
  }),

  userEditProfile: Joi.object().keys({
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Admin', 'Vendor'`,
    }),
    first_name: Joi.string().optional().empty().messages({
      'string.base'  : `First name should be a type of text`,
      'string.empty' : `First name cannot be an empty field`,
    }),
    last_name: Joi.string().optional().empty().messages({
      'string.base'  : `Last name should be a type of text`,
      'string.empty' : `Last name cannot be an empty field`,
    }),
    email_id: Joi.string().optional().empty().email().messages({
      'string.base'  : `Email should be a type of 'text'`,
      'string.empty' : `Email cannot be an empty field`,
      'string.email' : `Email format not valid`,
    }),
    dob: Joi.date().optional().max(Today).messages({
      'date.empty'   : `Date of birth cannot be an empty field`,
      'date.base'    : `Date of birth format not valid`,
      'date.max'     : `Date of birth of can't be greater then today's date`,
    }),
    gender: Joi.string().empty().optional().valid('male', 'female', 'other').messages({
      'string.empty'  : `Gender cannot be an empty field`,
      'any.only'      : `Gender must be 'male', 'female', 'other'`,
    }),
    phone_no: Joi.string().length(10).pattern(/^[0-9]+$/).optional().messages({
      'string.empty' : `Phone number cannot be an empty field`,
      'string.length': `Phone number should be a 10 Number`,
    }),
    country_id: Joi.number().optional().messages({
      'number.base'  : `Country id should be a type of number`,
    }),
    city_id: Joi.number().optional().messages({
      'number.base'  : `City id should be a type of number`,
    }),
    state_id: Joi.number().optional().messages({
      'number.base'  : `State id should be a type of number`,
    }),
    address_line_1: Joi.string().optional().messages({
      'string.base'  : `Address Line 1 should be a type of text`,
    }),
    address_line_2: Joi.string().optional().messages({
      'string.base'  : `Address Line 2 should be a type of text`,
    }),
    zip_code: Joi.number().optional().messages({
      'number.base'  : `Zip code should be a type of number`,
    }),
  }),

  vendorEditProfile: Joi.object().keys({
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Admin', 'Vendor'`,
    }),
    first_name: Joi.string().optional().messages({
      'string.base'  : `First name should be a type of text`,
    }),
    last_name: Joi.string().optional().messages({
      'string.base'  : `Last name should be a type of text`,
    }),
    dob: Joi.date().optional().max(Today).messages({
      'date.base'    : `Date of birth format not valid`,
      'date.max'     : `Date of birth of can't be greater then today's date`,
    }),
    gender: Joi.string().optional().valid('male', 'female', 'other').messages({
      'any.only'      : `Gender must be 'male', 'female', 'other'`,
    }),
    phone_no: Joi.string().length(10).pattern(/^[0-9]+$/).optional().messages({
      'string.length': `Phone number should be a 10 Number`,
    }),
    address: Joi.string().optional().messages({
      'string.base'  : `Address should be a type of text`,
    }),
    email_id: Joi.string().optional().email().messages({
      'string.base'  : `Email should be a type of 'text'`,
      'string.email' : `Email format not valid`,
    }),
    company_name: Joi.string().optional().messages({
      'string.base'  : `Company Name should be a type of text`,
    }),
    country_id: Joi.number().optional().messages({
      'number.base'  : `Country id should be a type of number`,
    }),
    address_line_1: Joi.string().optional().allow('').messages({
      'string.base'  : `Address line 1 should be a type of text`,
    }),
    address_line_2: Joi.string().optional().allow('').messages({
      'string.base'  : `Address line 2 should be a type of text`,
    }),
    city_id: Joi.number().optional().messages({
      'number.base'  : `City id should be a type of number`,
    }),
    state_id: Joi.number().optional().messages({
      'number.base'  : `State id should be a type of number`,
    }),
    zip_code: Joi.number().optional().messages({
      'number.base'  : `Zip Code should be a type of number`,
    }),
    is_kyc: Joi.boolean().optional().messages({
      'boolean.base'  : `Is kyc should be a type of boolean`,
    }),
  }),

  viewProfile: Joi.object().keys({
    id: Joi.number().empty().required().messages({
      'number.base'   : `Id should be a type of number`,
      'number.empty'  : `Id is not allowed to be empty`,
      'any.required'  : `Id is Required`,
    }),
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Admin', 'Vendor'`,
    }),
  }),

  resetPassword: Joi.object().keys({
    current_password: Joi.string().empty().required().messages({
      'string.base'  : `Password should be a type of 'text'`,
      'string.empty' : `Password cannot be an empty field`,
      'any.required' : `Password is Required`,
    }),
    password: Joi.string().empty().required().messages({
      'string.base'  : `Password should be a type of 'text'`,
      'string.empty' : `Password cannot be an empty field`,
      'any.required' : `Password is Required`,
    }),
    role: Joi.string().empty().required().valid('Users', 'Vendor').messages({
      'string.empty'  : `Role cannot be an empty field`,
      'string.gender' : `Role format not valid`,
      'any.required'  : `Role is Required`,
      'any.only'      : `Role must be 'Users', 'Vendor'`,
    }),
  }),

};
