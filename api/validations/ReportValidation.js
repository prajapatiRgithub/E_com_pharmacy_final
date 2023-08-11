/* eslint-disable camelcase */
const Joi = require('joi');

module.exports = {
  customerTransaction: Joi.object().keys({
    startDate: Joi.date().optional().allow(null,'').messages({
      'date.base' : `Start date format not valid`
    }),
    endDate: Joi.date().optional().allow(null,'').messages({
      'date.base'    : `End date format not valid`,
    }),
    customerName: Joi.string().optional().allow(null,'').messages({
      'string.base'  : `Customer name should be a type of text`
    }),
    limit: Joi.number().optional().allow(null,'').messages({
      'number.base'  : `Limit should be a type of number`
    }),
    sort: Joi.object().optional().min(1).allow(null,'').messages({
      'object.base'  : `Sort should be a type of object`,
      'object.min'   : 'Sort cannot be empty',
    }),
  }),

  customerOrder: Joi.object().keys({
    startDate: Joi.date().optional().allow(null,'').messages({
      'date.base' : `Start date format not valid`
    }),
    endDate: Joi.date().optional().allow(null,'').messages({
      'date.base'    : `End date format not valid`,
    }),
    customerName: Joi.string().optional().allow(null,'').messages({
      'string.base'  : `Customer name should be a type of text`
    }),
    orderStatus: Joi.string().optional().allow(null,'').messages({
      'string.base'  : `Order status should be a type of text`
    }),
    limit: Joi.number().optional().allow(null,'').messages({
      'number.base'  : `Limit should be a type of number`
    }),
    sort: Joi.object().optional().min(1).allow(null,'').messages({
      'object.base'  : `Sort should be a type of object`,
      'object.min'   : 'Sort cannot be empty',
    }),
  }),

  customer: Joi.object().keys({
    startDate: Joi.date().optional().allow(null,'').messages({
      'date.base' : `Start date format not valid`,
    }),
    endDate: Joi.date().optional().allow(null,'').messages({
      'date.base' : `End date format not valid`,
    }),
    status: Joi.string().optional().allow(null,'').messages({
      'string.base' : `Status should be a type of text`,
    }),
    field: Joi.string().optional().min(1).allow(null,'').messages({
      'string.base' : `Field should be a type of text`,
    }),
    sort: Joi.string().optional().min(1).allow(null,'').messages({
      'string.base' : `Sort should be a type of text`,
    }),
    limit: Joi.number().optional().allow(null,'').messages({
      'number.base'  : `Limit should be a type of number`,
    }),
  }),

  validator: Joi.object().keys({
    startDate: Joi.date().optional().allow(null,'').messages({
      'date.base'   : `Start date format not valid`
    }),
    endDate: Joi.date().optional().allow(null,'').messages({
      'date.base'   : `End date format not valid`
    }),
    limit: Joi.number().optional().allow(null,'').messages({
      'number.base' : `Limit should be a type of number`
    }),
    status: Joi.boolean().optional().allow(null,'').messages({
      'number.base' : `Status should be a type of number`
    }),
    sort: Joi.object().optional().min(1).allow(null,'').messages({
      'object.base' : `Sort should be a type of object`,
      'object.min'  : 'Sort cannot be empty'
    }),
  }),

  sale: Joi.object().keys({
    startDate: Joi.date().optional().allow(null,'').messages({
      'date.base' : `Start date format not valid`,
    }),
    endDate: Joi.date().optional().allow(null,'').messages({
      'date.base' : `End date format not valid`,
    }),
    sort: Joi.object().optional().min(1).allow(null,'').messages({
      'object.base'  : `Sort should be a type of object`,
      'object.min'   : 'Sort cannot be empty',
    }),
    limit: Joi.number().optional().allow(null,'').messages({
      'number.base'  : `Limit should be a type of number`,
    }),
  }),
};