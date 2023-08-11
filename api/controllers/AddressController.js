const { getAll } = require('../services/serviceLayer');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const addressValidation = require('../validations/CommonApiValidation');

module.exports = {
  address: async (req, res) => {
    try {
      let isValidation = addressValidation.address.validate(req.body);

      if (!isValidation.error) {
        const result = await getAll(req.body);

        if (result && result.length > 0) {
          return res.ok(
            result,
            messages.GET_SUCCESS,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.notFound(
            undefined,
            messages.DATA_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} address.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};