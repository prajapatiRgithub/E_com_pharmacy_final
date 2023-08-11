const categoryValidation = require('../validations/CategoryValidations');
const categoryIdValidation = require('../validations/IdValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const envVariables = require('../utils/constants/envVariables');
const { create, updateOne } = require('../services/serviceLayer');

module.exports = {
  addCategory: async (req, res) => {
    try {
      const isValidate = categoryValidation.categoryValidate.validate(req.body);
      if (!isValidate.error) {
        req
          .file('image')
          .upload({ dirname: envVariables.path }, async (err, uploadFile) => {
            if (err) {
              return res.serverError(err);
            }
            if (uploadFile && uploadFile.length > 0) {
              req.body.image = uploadFile[0].fd.split('/').slice(-1)[0];
            }
            let error = null;
            const createdCategoryData = await create(
              'Category',
              req.body
            ).catch((err) => {
              error = err;
            });
            if (error) {
              return res.serverError(
                error,
                `${messages.SOMETHING_WENT_WRONG}`,
                response.RESPONSE_STATUS.error
              );
            }
            return res.ok(
              { id: createdCategoryData.id },
              `Category ${messages.ADD_DATA}`,
              response.RESPONSE_STATUS.success
            );
          });
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
        `${messages.REQUEST_FAILURE} add category.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  editCategory: async (req, res) => {
    try {
      const idValidate = categoryIdValidation.idValidation.validate(req.params);
      const isValidate = categoryValidation.categoryEditValidate.validate(
        req.body
      );
      if (!idValidate.error && !isValidate.error) {
        req
          .file('image')
          .upload({ dirname: envVariables.path }, async (err, uploadFile) => {
            if (err) {
              return res.serverError(err);
            }
            if (uploadFile && uploadFile.length > 0) {
              req.body.image = uploadFile[0].fd.split('/').slice(-1)[0];
            }
            let error = null;
            const updateCategoryData = await updateOne(
              'Category',
              req.params,
              req.body
            ).catch((err) => {
              error = err;
            });
            if (error) {
              return res.serverError(
                error,
                `${messages.SOMETHING_WENT_WRONG}`,
                response.RESPONSE_STATUS.error
              );
            }
            if (updateCategoryData && updateCategoryData.length > 0) {
              return res.ok(
                undefined,
                messages.UPDATE_CATEGORY_SUCCESS,
                response.RESPONSE_STATUS.success
              );
            } else {
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
        `${messages.REQUEST_FAILURE} edit category.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const idValidate = categoryIdValidation.idValidation.validate(req.params);
      const isValidate = categoryValidation.categoryDeleteValidate.validate(
        req.body
      );
      if (!idValidate.error && !isValidate.error) {
        const categoryData = await updateOne('Category', req.params, req.body);
        if (categoryData && categoryData.length > 0) {
          return res.ok(
            undefined,
            `Category ${messages.DELETE_SUCCESS}`,
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
          idValidate.error ? idValidate.error : isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} delete category.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  deleteMultipleCategory: async (req, res) => {
    try {
      const isValidate = categoryValidation.multipleArray.validate(req.body);
      if (!isValidate.error) {
        let { id, is_archived } = req.body;

        await Category.update({ id }, { is_archived }).exec(async function afterwards(
          err,
          deleteData
        ) {
          if (err) {
            return res.serverError(
              err,
              `${messages.REQUEST_FAILURE} delete multiple category.`,
              response.RESPONSE_STATUS.error
            );
          }

          await Product.update({ category_id : id }, { is_archived })

            return res.ok(
              deleteData,
              `Category ${messages.DELETE_SUCCESS}`,
              response.RESPONSE_STATUS.success
            );
        });
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
        `${messages.REQUEST_FAILURE} delete multiple category.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
