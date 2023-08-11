/***************************************************************************

  Example usage:

  return res.ok();
  OR
  return res.ok(optionalData);

***************************************************************************/
const responseFormat = require('../services/responseFormat');

module.exports = function ok(data, message, status = "") {
  responseFormat.response(
    200,
    this.res,
    this.req,
    data,
    message,
    status
  );
};
