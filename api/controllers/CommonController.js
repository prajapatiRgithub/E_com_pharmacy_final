/***************************************************************************

  Controller     : Common

  **************************************************
  Functions
  **************************************************

  swagger     :   For exposing swagger.json from our project
  **************************************************

***************************************************************************/

const { getAll } = require('../services/serviceLayer');
const messages = require('../utils/constants/message');
const response = require('../utils/constants/enums');
const commonValidation = require('../validations/CommonApiValidation');

module.exports = {
  /**
   * This controller function will called when user request for all the swagger.json
   *
   * NOTE : Here we are not using are custom global response as we have to server swagger.json file
   */
  swagger: async (req, res) => {
    const swaggerJson = require('../../swagger/swagger.json');
    if (!swaggerJson) {
      res.status(404).set('content-type', 'application/json').send({
        message: 'Cannot find swagger.json, has the server generated it?',
      });
    }
    return res
      .status(200)
      .set('content-type', 'application/json')
      .send(swaggerJson);
  },

  logger: async (req, res) => {
    const systemLogger = require('../../logging/systemLogger.txt');
    if (!systemLogger) {
      res
        .status(404)
        .set('content-type', 'application/json')
        .send({ message: 'Cannot find systemLogger.txt' });
    }
    return res
      .status(200)
      .set('content-type', 'application/json')
      .send(swaggerJson);
  },

  listData: async (req, res) => {
    try {
      let isValidation = commonValidation.address.validate(req.body);

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
        `${messages.REQUEST_FAILURE} listData`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
