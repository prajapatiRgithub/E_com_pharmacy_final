const Joi = require('joi');

module.exports = {
  paymentValidate: Joi.object().keys({
    user_id: Joi.number().empty().required().messages({
      'number.base'   : `User id should be a type of number`,
      'number.empty'  : `User id is not allowed to be empty`,
      'any.required'  : `User id is Required`,
    }),
    order_id: Joi.number().empty().required().messages({
      'number.base'   : `Order id should be a type of number`,
      'number.empty'  : `Order id is not allowed to be empty`,
      'any.required'  : `Order id is Required`,
    }),
    payment_type: Joi.number().empty().required().messages({
      'number.base' : `Payment type should be a type of number`,
      'number.empty': `Payment type cannot be an empty field`,
      'any.required': `Payment type is Required`,
    }),
    payment_status: Joi.string().required().empty().valid('success', 'pending', 'failed').messages({
      'string.base' : `Payment status should be a type of text`,
      'string.empty': `Payment status cannot be an name field`,
      'any.only'    : `Payment status must be a 'success', 'pending', 'failed'`,
      'any.required': `Payment status is Required`,
    }),
  }),
};
