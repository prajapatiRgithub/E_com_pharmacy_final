/***************************************************************************

Administrator policy

This policy will check if jwt token includes role 'admin' or not.

Note: it is necessary to add isLoggedIn policy in order this policy to work

***************************************************************************/

const messages = require('../utils/constants/message');
const response = require("../utils/constants/enums");

module.exports = async (req, res, next) => {
  if (
    req.user.role === response.ENUM_ROLE.admin ||
    req.user.role === response.ENUM_ROLE.users ||
    req.user.role === response.ENUM_ROLE.vendor
  ) {
    return next();
  } else {
    return res.unAuthorized(
      undefined,
      messages.ADMIN_ACCESS_REQUIRED,
      response.RESPONSE_STATUS.error
    );
  }
};