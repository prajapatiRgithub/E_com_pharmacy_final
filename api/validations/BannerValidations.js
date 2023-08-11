const Joi = require("joi");

module.exports = {
  bannerValidate: Joi.object().keys({
    image: Joi.optional()
  }),

};
