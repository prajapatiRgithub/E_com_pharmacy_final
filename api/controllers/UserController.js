/* eslint-disable no-unused-vars */
/* eslint-disable camelCase */
const { generateToken } = require('../services/jwt');
const { hashPassword, comparePassword } = require('../services/bcrypt');
const userValidations = require('../validations/UserValidations');
const messages = require('../utils/constants/message');
const response = require('../utils/constants/enums');
const {
  create,
  findOne,
  updateOne,
} = require('../services/serviceLayer');
const { sendMail } = require('../services/nodemailer');
const { idValidation } = require('../validations/IdValidation');
let otp = Math.floor(100000 + Math.random() * 900000);

module.exports = {
  signup: async (req, res) => {
    try {
      let { role } = req.body;
      let isValidate = userValidations.roleValidation.validate({ role });

      if (isValidate.error) {
        return res.badRequest(
          isValidate.error,
          null,
          response.RESPONSE_STATUS.error
        );
      }

      if (response.ENUM_ROLE.vendor === role) {
        isValidate = userValidations.vendorSignup.validate(req.body);
      }
      if (response.ENUM_ROLE.users === role) {
        isValidate = userValidations.userSignup.validate(req.body);
      }

      if (!isValidate.error) {
        req.body.password = await hashPassword(req.body.password);

        const {
          address_line_1,
          address_line_2,
          zip_code,
          country_id,
          state_id,
          city_id,
        } = req.body;

        let data = { };

        if (address_line_1 || address_line_2 || zip_code || country_id || state_id || city_id) {
          data.address_line_1 =address_line_1;
          data.address_line_2 = address_line_2;
          data.zip_code = zip_code;
          data.country_id = country_id;
          data.state_id = state_id;
          data.city_id = city_id;
        }

        // req.body.dob = req.body.dob ? req.body.dob : null;
        
        console.log("req.ov",req.body);

        let userData = await create(role, req.body);

        if (userData && Object.keys(userData).length > 0) {
          if ((role === response.ENUM_ROLE.users) && (data && Object.keys(data).length > 0) ) {
            data.user_id = userData.id;
            await create("Bill_Address", data);
          }
          return res.ok(
            undefined,
            messages.REGISTER_SUCCESS,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.notFound(
            undefined,
            messages.USER_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} registration.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  login: async (req, res) => {
    try {
      const isValidate = userValidations.login.validate(req.body);

      if (!isValidate.error) {
        const { email_id, password, role } = req.body;
        const obj = {};
        const user = await findOne(role, { email_id });
        if (user && Object.keys(user).length > 0) {
          let isPasswordMatched = await comparePassword(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            res.badRequest(
              undefined,
              messages.INCORRECT_CREDENTIALS,
              response.RESPONSE_STATUS.error
            );
          } else {
            //generate token for using jwt.
            const token = generateToken({
              id: user.id,
              role: role,
            });
            obj.id = user.id;
            obj.token = token;
            return res.ok(
              obj,
              messages.LOGIN_SUCCESS,
              response.RESPONSE_STATUS.success
            );
          }
        } else {
          return res.notFound(
            undefined,
            messages.USER_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} login.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email_id, role } = req.body;

      let isValidate = userValidations.verifyEmail.validate(req.body);

      if (!isValidate.error) {
        const userData = await findOne(role, { email_id });
        if (userData && Object.keys(userData).length > 0) {
          sendMail(email_id, otp);
          return res.ok(
            {otp},
            messages.EMAIL_SENT,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.notFound(
            undefined,
            messages.USER_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          null,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} verify email.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  verifyOtp: async (req, res) => {
    try {
      let isValidate = userValidations.verifyOtp.validate(req.body);

      if (!isValidate.error) {
        if (otp === req.body.otp) {
          res.ok(
            undefined,
            messages.OTP_VERIFY,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.ok(
            undefined,
            messages.OTP_NOT_MATCHED,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} verify otp.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  updatePassword: async (req, res) => {
    try {
      const isValidate = userValidations.updatePassword.validate(req.body);

      if (isValidate.error) {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }

      const { email_id, password, role } = req.body;

      const userData = await findOne(role, { email_id });

      if (userData && Object.keys(userData).length > 0) {
        const encryptedPassword = await hashPassword(password);

        const userPasswordUpdate = await updateOne(
          role,
          { email_id },
          { password: encryptedPassword }
        );

        const [dataValues] = userPasswordUpdate;
        if (dataValues) {
          return res.ok(
            undefined,
            messages.RESET_PASSWORD_SUCCESS,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.notFound(
            undefined,
            messages.RESET_PASSWORD_FAILURE,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.ok(
          undefined,
          messages.EMAIL_INCORRECT,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} update password`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  editProfile: async (req, res) => {
    try {
      let idValidate =  idValidation.validate(req.params);
      let { role } = req.body;
      let isValidate = userValidations.roleValidation.validate({ role });

      if (idValidate.error && isValidate.error) {
        return res.badRequest(
          idValidate.error ? idValidate.error : isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }

      if (response.ENUM_ROLE.vendor === role) {
        isValidate = userValidations.vendorEditProfile.validate(req.body);
      }
      if (response.ENUM_ROLE.users === role) {
        isValidate = userValidations.userEditProfile.validate(req.body);
      }

      delete req.body.role;

      if (!isValidate.error) {
        let userData = await updateOne(role, { id: req.params.id }, req.body);

        if ( userData && userData.length > 0 ) {
          return res.ok(
            undefined,
            messages.UPDATE_PROFILE_SUCCESS,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.ok(
            undefined,
            messages.DATA_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} edit profile.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  viewProfile: async (req, res) => {
    try {
      const { id, role } = req.params;
      const isValidate = userValidations.viewProfile.validate(req.params);

      if (!isValidate.error) {
        const userProfile = await findOne(role, { id });

        if (userProfile && Object.keys(userProfile).length > 0) {
          const countryData = await findOne('Country', {
            id: userProfile.country_id,
          });
          const stateData = await findOne('State', {
            id: userProfile.state_id,
          });
          const cityData = await findOne('City', { id: userProfile.city_id });

          userProfile.country_id = countryData.country_name;
          userProfile.state_id = stateData.state_name;
          userProfile.city_id = cityData.city_name;

          return res.ok(
            userProfile,
            messages.PROFILE_SUCCESS,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.ok(
            undefined,
            messages.ID_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} view profile.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { current_password, password, role } = req.body;
      let idValidate = idValidation.validate(req.params);
      const { id } = req.params;

      let isValidate = userValidations.resetPassword.validate(req.body);

      if (!isValidate.error && !idValidate.error) {
        const user = await findOne(role, { id }, [
          'id',
          'email_id',
          'password',
        ]);

        if (user && Object.keys(user).length > 0) {
          const comparison = await comparePassword(
            current_password,
            user.password
          );
          if (comparison) {
            const updatePassword = await hashPassword(password);

            const userUpdatePassword = await updateOne(
              role,
              { id },
              { password: updatePassword }
            );

            if (userUpdatePassword && userUpdatePassword.length > 0) {
              return res.ok(
                undefined,
                messages.RESET_PASSWORD_SUCCESS,
                response.RESPONSE_STATUS.success
              );
            } else {
              return res.notFound(
                undefined,
                messages.RESET_PASSWORD_FAILURE,
                response.RESPONSE_STATUS.error
              );
            }
          } else {
            return res.notFound(
              undefined,
              messages.RESET_INCORRECT_PASSWORD,
              response.RESPONSE_STATUS.error
            );
          }
        } else {
          return res.ok(
            undefined,
            messages.DATA_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        res.badRequest(
          isValidate.error ? isValidate.error : idValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} reset password`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
