/***************************************************************************

  Example usage:

  return res.serverError();
  OR
  return res.serverError(optionalData);

***************************************************************************/
const responseFormat = require('../services/responseFormat');

module.exports = function serverError(data, message, status = "") {
  responseFormat.response(
    500,
    this.res,
    this.req,
    data,
    message,
    status
  );
};
