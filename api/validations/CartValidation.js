/* eslint-disable camelcase */
const Joi = require('joi');

module.exports = {
  addToCart: Joi.object().keys({
    user_id: Joi.number().empty().required().messages({
      'number.base'  : `User id should be a type of number`,
      'number.empty' : 'User id is not allowed to be empty',
      'any.required' : `User id is Required`,
    }),
    product_id: Joi.number().empty().required().messages({
      'number.base'  : `Product id should be a type of number`,
      'number.empty' : 'Product id is not allowed to be empty',
      'any.required' : `Product id is Required`,
    }),
    prescription: Joi.string().optional().messages({
      'string.base'  : `Prescription should be a type of text`,
    }),
    quantity: Joi.number().empty().required().messages({
      'number.base'  : `Quantity should be a type of number`,
      'number.empty' : 'Quantity is not allowed to be empty',
      'any.required' : `Quantity is Required`,
    }),
    flag: Joi.number().optional().required().messages({
      'number.base'  : `Flag should be a type of number`,
      'any.required' : `Flag is Required`,
    })
  }),

  editCart: Joi.object().keys({
    quantity: Joi.number().empty().optional().messages({
      'number.base'  : `Quantity should be a type of number`,
      'number.empty' : 'Quantity is not allowed to be empty',
    })
  }),
  
  addPrescription: Joi.object().keys({
    cart_id: Joi.required().messages({
      'number.empty' : 'Cart id is not allowed to be empty',
      'any.required' : `Cart id is Required`,
    }),
    user_id: Joi.number().empty().required().messages({
      'number.base'  : `User id should be a type of number`,
      'number.empty' : 'User id is not allowed to be empty',
      'any.required' : `User id is Required`,
    }),
    product_id: Joi.required().messages({
      'number.empty' : 'Product id is not allowed to be empty',
      'any.required' : `Product id is Required`,
    }),
    prescription: Joi.optional(),
    quantity: Joi.required().messages({
      'number.empty' : 'Quantity is not allowed to be empty',
      'any.required' : `Quantity is Required`,
    }),
  }),
};
