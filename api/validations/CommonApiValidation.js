const Joi = require('joi');

module.exports = {
  address: Joi.object().keys({
    model: Joi.string().empty().required().messages({
      'string.base' : `Model should be a type of text`,
      'string.empty': 'Model is not allowed to be empty',
      'any.required': `Model is Required`,
    }),
    condition: Joi.object().optional().min(1).messages({
      'object.base' : `Condition should be a type of object`,
      'object.min'  : 'Condition cannot be empty',
    }),
    attribute: Joi.array().optional().min(1).messages({
      'array.base'  : `Attribute should be a type of array`,
      'array.min'   : 'Attribute cannot be empty',
    }),
    page: Joi.number().optional().messages({
      'number.base' : `Page should be a type of number`,
      'number.empty': 'Page is not allowed to be empty',
    }),
    limit: Joi.number().optional().messages({
      'number.base' : `Limit should be a type of number`,
      'number.empty': 'Limit is not allowed to be empty',
    }),
    sortField: Joi.array().optional().messages({
      'array.base' : `Sort field should be a type of array`,
      'array.empty': 'Sort field is not allowed to be empty',
    }),
  }),
};
