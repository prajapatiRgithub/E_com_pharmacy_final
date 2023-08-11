const Joi = require('joi');

module.exports = {
  editVendor: Joi.object().keys({
    status: Joi.number().empty().required().messages({
      'number.base'  : `Status should be a type of number`,
      'number.empty' : 'Status is not allowed to be empty',
      'any.required' : `Status is Required`,
    }),
    id: Joi.number().empty().required().messages({
      'number.base'  : `Id should be a type of number`,
      'number.empty' : `Id is not allowed to be empty`,
      'any.required' : `Id is Required`,
    }),
    reason: Joi.string().empty().optional().messages({
      'string.base'  : `Reason should be a type of string`,
      'string.empty' : `Reason is not allowed to be empty`,
    }),
  }),

  orderInvoice : Joi.object().keys({
    user_id: Joi.number().empty().required().messages({
      'number.base'  : `User id should be a type of number`,
      'number.empty' : 'User id is not allowed to be empty',
      'any.required' : `User id is Required`,
    })
  })
};