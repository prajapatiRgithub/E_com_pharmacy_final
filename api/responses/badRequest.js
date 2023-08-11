/***************************************************************************

  Example usage:

  return res.badRequest();
  OR
  return res.badRequest(optionalData);

***************************************************************************/
const responseFormat = require('../services/responseFormat');

module.exports = function badRequest(data, message, status = "") {
  responseFormat.response(
    400,
    this.res,
    this.req,
    data,
    message,
    status
  );
};
