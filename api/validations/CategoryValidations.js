const Joi = require('joi');

module.exports = {
  categoryValidate: Joi.object().keys({
    order: Joi.number().optional().allow('').messages({
      'number.base'  : `Order should be a type of number`,
    }),
    name: Joi.string().required().empty().messages({
      'string.base'  : `Name should be a type of text`,
      'string.empty' : `Name cannot be an empty field`,
      'any.required' : `Name is Required`,
    }),
    description: Joi.string().optional().allow('').messages({
      'string.base'  : `Description should be a type of text`,
    }),
    image: Joi.optional(),
  }),
  categoryEditValidate: Joi.object().keys({
    order: Joi.number().optional().allow('').messages({
      'number.base'  : `Order should be a type of number`,
    }),
    name: Joi.string().optional().allow('').messages({
      'string.base'  : `Name should be a type of text`,
    }),
    description: Joi.string().optional().allow('').messages({
      'string.base'  : `Description should be a type of text`,
    }),
    image: Joi.optional(),
  }),

  categoryDeleteValidate: Joi.object().keys({
    is_archived: Joi.boolean().required().empty().messages({
      'boolean.base'  : `Is archived should be a type of boolean`,
      'boolean.empty' : 'Is archived is not allowed to be empty',
      'any.required'  : `Is archived is Required`,
    }),
  }),

  multipleArray: Joi.object().keys({
    id: Joi.array().optional().min(1).messages({
      'array.base'  : `Id should be a type of array`,
      'array.min'   : 'Id cannot be empty',
    }),
    is_archived: Joi.boolean().required().empty().messages({
      'boolean.base'  : `Is archived should be a type of boolean`,
      'boolean.empty' : 'Is archived is not allowed to be empty',
      'any.required'  : `Is archived is Required`,
    }),
  }),
};
