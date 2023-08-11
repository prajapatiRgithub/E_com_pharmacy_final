/***************************************************************************

  Services     : jwt

  **************************************************
  Functions
  **************************************************
  generateToken,
  verify
  **************************************************

***************************************************************************/

const jwt = require('jsonwebtoken');
const envVariables = require('../utils/constants/envVariables');

module.exports = {
  generateToken: (payload, expiresIn = '1d') => {
    return jwt.sign(payload, envVariables.JWT_SECRET_KEY, {
      expiresIn,
    });
  },
  verify: (token) => {
    return jwt.verify(token, envVariables.JWT_SECRET_KEY);
  },
};