const Joi = require("joi");

module.exports = {
  idValidation: Joi.object().keys({
    id: Joi.number().empty().required().messages({
      'number.base'   : `Id should be a type of number`,
      'number.empty'  : `Id is not allowed to be empty`,
      'any.required'  : `Id is Required`,
    }),
  }),
  userIdValidation: Joi.object().keys({
    user_id: Joi.number().empty().required().messages({
      'number.base'   : `User id should be a type of number`,
      'number.empty'  : `User id is not allowed to be empty`,
      'any.required'  : `User id is Required`,
    }),
  }),
  orderIdValidation: Joi.object().keys({
    order_id: Joi.number().empty().required().messages({
      'number.base'   : `Order id should be a type of number`,
      'number.empty'  : `Order id is not allowed to be empty`,
      'any.required'  : `Order id is Required`,
    }),
  }),
  productIdValidation: Joi.object().keys({
    product_id: Joi.number().empty().required().messages({
      'number.base'   : `Product id should be a type of number`,
      'number.empty'  : `Product id is not allowed to be empty`,
      'any.required'  : `Product id is Required`,
    }),
  })
};
