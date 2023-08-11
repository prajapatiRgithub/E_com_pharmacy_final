const Joi = require('joi');

module.exports = {
  billAddress: Joi.object().keys({
    user_id: Joi.number().empty().required().messages({
      'number.base'  : `User id should be a type of number`,
      'number.empty' : 'User id is not allowed to be empty',
      'any.required' : `User id is Required`,
    }),
    address_line_1: Joi.string().empty().required().messages({
      'string.base'  : `Address line 1 should be a type of text`,
      'string.empty' : 'Address line 1 is not allowed to be empty',
      'any.required' : `Address line 1 is Required`,
    }),
    address_line_2: Joi.string().empty().required().messages({
      'string.base'  : `Address line 2 should be a type of text`,
      'string.empty' : 'Address line 2 is not allowed to be empty',
      'any.required' : `Address line 2 is Required`,
    }),
    alternative_no: Joi.string().empty().required().messages({
      'string.base'  : `Alternative no should be a type of text`,
      'string.empty' : 'Alternative no is not allowed to be empty',
      'any.required' : `Alternative no is Required`,
    }),
    city_id: Joi.number().empty().required().messages({
      'number.base'  : `City id should be a type of number`,
      'number.empty' : 'City id is not allowed to be empty',
      'any.required' : `City id is Required`,
    }),
    state_id: Joi.number().empty().required().messages({
      'number.base'  : `State id should be a type of number`,
      'number.empty' : 'State id is not allowed to be empty',
      'any.required' : `State id is Required`,
    }),
    country_id: Joi.number().empty().required().messages({
      'number.base'  : `Country id should be a type of number`,
      'number.empty' : 'Country id is not allowed to be empty',
      'any.required' : `Country id is Required`,
    }),
    zip_code: Joi.number().empty().required().messages({
      'number.base'  : `Zip code should be a type of number`,
      'number.empty' : 'Zip code is not allowed to be empty',
      'any.required' : `Zip code is Required`,
    }),
    place: Joi.string().empty().optional().messages({
      'string.base'  : `Place should be a type of text`,
      'string.empty' : 'Place is not allowed to be empty',
    }),
  }),

  editAddress: Joi.object().keys({
    address_line_1: Joi.string().optional().allow('').messages({
      'string.base'  : `Address line 1 should be a type of text`,
    }),
    address_line_2: Joi.string().optional().allow('').messages({
      'string.base'  : `Address line 2 should be a type of text`,
    }),
    alternative_no: Joi.string().optional().allow('').messages({
      'string.base'  : `Alternative no should be a type of text`,
    }),
    city_id: Joi.number().optional().allow('').messages({
      'number.base'  : `City id should be a type of number`,
    }),
    state_id: Joi.number().optional().allow('').messages({
      'number.base'  : `State id should be a type of number`,
    }),
    country_id: Joi.number().optional().allow('').messages({
      'number.base'  : `Country id should be a type of number`,
    }),
    zip_code: Joi.number().optional().allow('').messages({
      'number.base'  : `Zip code should be a type of number`,
    }),
    place: Joi.string().optional().allow('').messages({
      'string.base'  : `Place should be a type of text`,
    }),
  }),

  viewAddress: Joi.object().keys({
    id: Joi.number().empty().optional().messages({
      'number.base'   : `Id should be a type of number`,
      'number.empty'  : `Id is not allowed to be empty`,
    }),
    user_id: Joi.number().optional().allow('').messages({
      'number.base'   : `User id should be a type of number`,
    }),
  }),
  
};