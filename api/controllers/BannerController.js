const bannerValidation = require('../validations/BannerValidations');
const bannerIdValidation = require('../validations/IdValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const envVariables = require('../utils/constants/envVariables');
const { create, updateOne, deleteOne } = require('../services/serviceLayer');

module.exports = {
  addBanner: async (req, res) => {
    try {
      const isValidation = bannerValidation.bannerValidate.validate(req.body);
      if (!isValidation.error) {
        req
          .file('image')
          .upload({ dirname: envVariables.path }, async (err, uploadFile) => {
            if (err) {
              return res.serverError(
                err,
                messages.SOMETHING_WENT_WRONG,
                response.RESPONSE_STATUS.error
              );
            }
            if (uploadFile && uploadFile.length === 0) {
              return res.badRequest(
                undefined,
                messages.IMAGE_VALIDATIONS,
                response.RESPONSE_STATUS.error
              );
            }
            let filename = '';
            if (uploadFile && uploadFile.length > 0) {
              filename = uploadFile[0].fd.split('/').slice(-1)[0];
            }

            let error = null;
            const data = { image: filename };
            const createBannerData = await create('Banner', data).catch(
              err => {
                error = err;
              }
            );
            if (error) {
              return res.serverError(
                error,
                `${messages.SOMETHING_WENT_WRONG}`,
                response.RESPONSE_STATUS.error
              );
            }
            return res.ok(
              { id: createBannerData.id },
              `Banner ${messages.ADD_DATA}`,
              response.RESPONSE_STATUS.success
            );
          });
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} add banner.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  editBanner: async (req, res) => {
    try {
      const idValidate = bannerIdValidation.idValidation.validate(req.params);
      const isValidate = bannerValidation.bannerValidate.validate(req.body);
      if (!idValidate.error && !isValidate.error) {
        req
          .file('image')
          .upload({ dirname: envVariables.path }, async (err, uploadFile) => {
            if (err) {
              return res.serverError(
                err,
                messages.SOMETHING_WENT_WRONG,
                response.RESPONSE_STATUS.error
              );
            }
            if (uploadFile && uploadFile.length === 0) {
              return res.badRequest(
                undefined,
                messages.IMAGE_VALIDATIONS,
                response.RESPONSE_STATUS.error
              );
            }
            let filename = '';
            if (uploadFile && uploadFile.length > 0) {
              filename = uploadFile[0].fd.split('/').slice(-1)[0];
            }

            let error = null;
            const data = { image: filename };
            const responseData = await updateOne(
              'Banner',
              req.params,
              data
            ).catch(err => {
              error = err;
            });
            if (error) {
              return res.serverError(
                error,
                `${messages.SOMETHING_WENT_WRONG}`,
                response.RESPONSE_STATUS.error
              );
            }
            if(responseData && responseData.length > 0){
              return res.ok(
                undefined,
                `Banner ${messages.UPDATE_SUCCESS}`,
                response.RESPONSE_STATUS.success
              );
            }else{
              return res.ok(
                undefined,
                messages.ID_NOT_FOUND,
                response.RESPONSE_STATUS.error
              );
            }
          });
      } else {
        return res.badRequest(
          idValidate.error ? idValidate.error : isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} edit banner.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  deleteBanner: async (req, res) => {
    try {
      const isValidation = bannerIdValidation.idValidation.validate(req.params);
      if (!isValidation.error) {
        const bannerData = await deleteOne('Banner', req.params);
        if (bannerData && bannerData.length > 0) {
          return res.ok(
            undefined,
            `Banner ${messages.DELETE_SUCCESS}`,
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
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} delete banner.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
