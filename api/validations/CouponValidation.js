const Joi = require('joi');
const Moment = require('moment');
const Today = Moment().format('YYYY-MM-DD');

module.exports = {
  couponValidate: Joi.object().keys({
    coupon_code: Joi.string().required().empty().max(6).messages({
      'string.base' : `Coupon code should be a type of text`,
      'string.empty': `Coupon code cannot be an empty field`,
      'code.max'    : `Coupon code can't be greater then coupon_code`,
      'any.required': `Coupon code is Required`,
    }),
    start_date: Joi.date().required().max(Today).messages({
      'date.empty'  : `Start date cannot be an empty field`,
      'date.base'   : `Start date format not valid`,
      'date.max'    : `Start date of can't be greater then today's date`,
      'any.required': `Start date is Required`,
    }),
    end_date: Joi.date().required().max(Today).messages({
      'date.empty'  : `End date cannot be an empty field`,
      'date.base'   : `End date format not valid`,
      'date.max'    : `End date of can't be greater then today's date`,
      'any.required': `End date is Required`,
    }),
    product_id: Joi.number().empty().required().messages({
      'number.base' : `Product id should be a type of number`,
      'number.empty': 'Product id  is not allowed to be empty',
      'any.required': `Product id is Required`,
    }),
    condition: Joi.string().empty().optional().messages({
      'string.base' : `Condition should be a type of text`,
      'string.empty': 'Condition is not allowed to be empty',
    }),
    min_amount: Joi.number().empty().optional().messages({
      'number.base' : `Min amount should be a type of number`,
      'number.empty': 'Min amount is not allowed to be empty',
    }),
  }),
};
