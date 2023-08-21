/* eslint-disable camelcase */
const billAddressValidation = require('../validations/BillAddressValidation');
const addressIdValidation = require('../validations/IdValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const {
  create,
  deleteOne,
  findOne,
  updateOne,
  findPopulate,
} = require('../services/serviceLayer');

module.exports = {
  addAddress: async (req, res) => {
    try {
      const isValidate = billAddressValidation.billAddress.validate(req.body);
      if (!isValidate.error) {
        const addData = await create('Bill_Address', req.body);

        if (addData && Object.keys(addData).length > 0) {
          return res.ok(
            {id: addData.id},
            `BillAddress ${messages.ADD_DATA}`,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.notFound(
            undefined,
            messages.ADDRESS_FAILED,
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
        `${messages.REQUEST_FAILURE} added address.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  viewAddress: async (req, res) => {
    try {
      const isValidation = billAddressValidation.viewAddress.validate(
        req.params
      );
      if (!isValidation.error) { 
        let obj = {};
        const {user_id, id} = req.body;

        obj.user_id = user_id;   
        obj.id = id;

        const findData = await findPopulate('Bill_Address', obj, ['user_id']);

        if (findData && findData.length > 0) {
          const data = findData.map((value) => {
            return {
              id             : value.id,
              is_archived    : value.is_archived,
              address_line_1 : value.address_line_1,
              address_line_2 : value.address_line_2,
              zip_code       : value.zip_code,
              city_id        : value.city_id,
              state_id       : value.state_id,
              country_id     : value.country_id,
              first_name     : value.user_id.first_name,
              phone_no       : value.user_id.phone_no,
              alternative_no : value.alternative_no
            };
          });
          let result = [];
          for (let item of data) {
            const countryData = await findOne('Country', {
              id: item.country_id,
            });
            const stateData = await findOne('State', { id: item.state_id });
            const cityData = await findOne('City', { id: item.city_id });

            item.country_id = countryData.country_name;
            item.state_id = stateData.state_name;
            item.city_id = cityData.city_name;

            result.push(item);
          }
          return res.ok(
            result,
            messages.GET_ADDRESS,
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
        `${messages.REQUEST_FAILURE} view address.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  editAddress: async (req, res) => {
    try {
      const idValidation = addressIdValidation.idValidation.validate(req.params);
      const isValidate = billAddressValidation.editAddress.validate(req.body);

      if (!isValidate.error && !idValidation.error) {
        const editData = await updateOne('Bill_Address', req.params, req.body);

        if (editData && editData.length > 0) {
          return res.ok(
            undefined,
            `Address ${messages.UPDATE_SUCCESS}`,
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
          idValidation.error ? idValidation.error : isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} edit address.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const isValidation = addressIdValidation.idValidation.validate(
        req.params
      );

      if (!isValidation.error) {
        const data = await deleteOne('Bill_Address', req.params);

        if (data && data.length > 0) {
          return res.ok(
            undefined,
            `Address ${messages.DELETE_SUCCESS}`,
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
        `${messages.REQUEST_FAILURE} delete address.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
