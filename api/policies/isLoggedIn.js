/***************************************************************************

isLoggedIn policy

This policy will check if api header contains Authorization header or not.
If contains then will fetch user details and pass as req.user else will send
err response to api.

Note: it is necessary to add isLoggedIn policy in order to add authorization check

***************************************************************************/

const { verify } = require("../services/jwt");
const messages = require('../utils/constants/message');
const response = require("../utils/constants/enums");
const { findOne } = require("../services/serviceLayer");

module.exports = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.unAuthorized(
      undefined,
      messages.AUTH_TOKEN_MISSING,
      response.RESPONSE_STATUS.error
    );
  }

  const tokenParam = req.headers.authorization;
  const decodedToken = verify(tokenParam);

  let user;
  if (decodedToken) {
    user = await findOne(decodedToken.role, { id: decodedToken.id });
  }

  if (!user & !Object.keys(user).length) {
    return res.unAuthorized(
      undefined,
      messages.INVALID_TOKEN,
      response.RESPONSE_STATUS.error
    );
  }

  user.role = decodedToken.role;
  req.user = user;

  next();
};