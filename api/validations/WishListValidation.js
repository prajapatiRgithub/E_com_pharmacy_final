const Joi = require('joi');

module.exports = {
  wishList: Joi.object().keys({
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
  })
};