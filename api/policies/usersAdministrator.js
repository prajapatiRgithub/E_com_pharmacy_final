const messages = require('../utils/constants/message');
const response = require("../utils/constants/enums");

module.exports = async (req, res, next) => {
  if (req.user.role === response.ENUM_ROLE.users) {
    return next();
  } else {
    return res.unAuthorized(
      undefined,
      messages.ADMIN_ACCESS_REQUIRED,
      response.RESPONSE_STATUS.error
    );
  }
};