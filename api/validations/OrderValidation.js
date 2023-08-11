const Joi = require('joi');

module.exports = {
  checkOut: Joi.object().keys({
    user_id: Joi.number().empty().required().messages({
      'number.base'  : `User id should be a type of number`,
      'number.empty' : `User id cannot be an empty field`,
      'any.required' : `User id is a Required`,
    }), 
    address_id : Joi.number().empty().required().messages({
      'number.base'  : `Address id should be a type of number`,
      'number.empty' : `Address id cannot be an empty field`,
      'any.required' : `Address id is a Required`,
    }),
    shipping_id : Joi.number().optional().allow('').messages({
      'number.base'  : `Address id should be a type of number`,
    }), 
    tax: Joi.number().optional().messages({
      'number.base'  : `Tax should be a type of number`,
    }),
    product_id : Joi.array().min(1).required().messages({
      'array.base'   : `Product id should be a type of array`,
      'array.min'    : `Product id cannot be an empty field`,
      'any.required' : `Product id is a Required`,
    }), 
    quantity: Joi.array().min(1).required().messages({
      'array.base'   : `Quantity should be a type of array`,
      'array.min'    : `Quantity cannot be an empty field`,
      'any.required' : `Quantity is a Required`,
    }),
  }),

  orderCancel: Joi.object().keys({
    id: Joi.number().empty().required().messages({
      'number.base'  : `Id should be a type of number`,
      'number.empty' : `Id cannot be an empty field`,
      'any.required' : `Id is a Required`,
    }), 
    flag: Joi.boolean().required().messages({
      'boolean.base'  : `Flag should be a type of boolean`,
      'boolean.empty' : 'Flag is not allowed to be empty',
      'any.required'  : `Flag is a Required`,
    }),
  }),

  orderStatus: Joi.object().keys({
    id: Joi.number().empty().required().messages({
      'number.base'  : `Id should be a type of number`,
      'number.empty' : `Id cannot be an empty field`,
      'any.required' : `Id is a Required`,
    }), 
    flag: Joi.number().empty().required().messages({
      'number.base'  : `Flag should be a type of number`,
      'number.empty' : `Flag cannot be an empty field`,
      'any.required' : `Flag is a Required`,
    }), 
  }),
};