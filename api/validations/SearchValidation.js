const Joi = require('joi');

module.exports = {
  addSearch: Joi.object().keys({
    message: Joi.string().required().empty().messages({
      'string.base'  : `Message should be a type of text`,
      'string.empty' : `Message cannot be an empty field`,
      'any.required' : `Message is Required`,
    }),
    user_id: Joi.number().empty().required().messages({
      'number.base'  : `User id should be a type of number`,
      'number.empty' : 'User id is not allowed to be empty',
      'any.required' : `User id is Required`,
    }),
    productName: Joi.string().optional().allow(null).messages({
      'string.base'  : `Product name should be a type of text`
    }),
  })
};
