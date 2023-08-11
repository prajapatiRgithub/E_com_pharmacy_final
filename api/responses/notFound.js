/***************************************************************************

  Example usage:

  return res.notFound();
  OR
  return res.notFound(optionalData);

***************************************************************************/
const responseFormat = require('../services/responseFormat');

module.exports = function notFound(data, message, status = "") {
  responseFormat.response(
    404,
    this.res,
    this.req,
    data,
    message,
    status
  );
};
