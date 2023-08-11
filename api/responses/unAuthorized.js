/***************************************************************************

  Example usage:

  return res.unAuthorized();
  OR
  return res.unAuthorized(optionalData);

***************************************************************************/
const responseFormat = require('../services/responseFormat');

module.exports = function unAuthorized(data, message, status = "") {
  responseFormat.response(
    401,
    this.res,
    this.req,
    data,
    message,
    status
  );
};
