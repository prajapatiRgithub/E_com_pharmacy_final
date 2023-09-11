const messages = require('../utils/constants/message');
const response = require('../utils/constants/enums');
const { findAll, findOne, updateOne } = require('../services/serviceLayer');
const vendorValidation = require('../validations/VendorValidation');
const idValidation = require('../validations/IdValidation');

module.exports = {
  vendorApproval: async (req, res) => {
    try {
      const isValidate = vendorValidation.editVendor.validate(req.body);

      if (!isValidate.error) {
        const data = await updateOne(
          'Vendor',
          { id: req.body.id },
          { status: req.body.status }
        );

        if (data && Object.keys(data).length > 0) {
          if (req.body.status === 1) {
            return res.ok(
              undefined,
              messages.VENDOR_APPROVED,
              response.RESPONSE_STATUS.success
            );
          }

          if (req.body.status === 0) {
            return res.ok(
              undefined,
              messages.VENDOR_REJECTED,
              response.RESPONSE_STATUS.success
            );
          }
        } else {
          return res.notFound(
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
        `${messages.REQUEST_FAILURE} vendor approval.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  vendorList: async (req, res) => {
    try {
      const vendorData = await findAll(
        'Vendor',
        undefined,
        undefined,
        undefined,
        1000
      );

      let result = [];
      for (let item of vendorData) {
        const countryData = await findOne('Country', { id: item.country_id });
        const StateData = await findOne('State', { id: item.state_id });
        const cityData = await findOne('City', { id: item.city_id });

        item.country_id = countryData.country_name;
        item.state_id = StateData.state_name;
        item.city_id = cityData.city_name;

        result.push(item);
      }

      return res.ok(
        result,
        messages.VENDOR_SUCCESS,
        response.RESPONSE_STATUS.success
      );
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} vendorList`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  orderList: async (req, res) => {
    try {
      Order.query(
        'SELECT `order`.`id` as order_id, `order`.`status` ,`order`.`total_amount` as price ,users.first_name, users.last_name FROM `order` INNER JOIN users ON users.id = `order`.`user_id` where `order`.`is_archived` = false ORDER BY `order`.`created_at` DESC',
        async (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.SOMETHING_WENT_WRONG,
              response.RESPONSE_STATUS.error
            );
          }

          if (rawResult && rawResult.rows.length > 0) {
            return res.ok(
              rawResult.rows,
              messages.GET_LIST_DATA,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.notFound(
              [],
              messages.DATA_NOT_FOUND,
              response.RESPONSE_STATUS.error
            );
          }
        }
      );
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} order list.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  vendorPendingList: async (req, res) => {
    try {
      const approvalList = await findAll('Vendor', { status: 2 });

      const data = approvalList.map((item) => {
        return {
          id          : item.id,
          name        : item.first_name,
          lastName    : item.last_name,
          phoneNumber : item.phone_no,
          Status      : item.status,
        };
      });

      return res.ok(
        data,
        messages.LIST_OF_APPROVAL,
        response.RESPONSE_STATUS.success
      );
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} vendor pending list.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  orderInvoice: async (req, res) => {
    try {
      const isValidate = idValidation.orderIdValidation.validate(req.params);
      if (!isValidate.error) {
        Order.query(
          'SELECT users.first_name,users.last_name,product.id,`order`.`address_id`, product.name,product.description,product.price,product_image.image,order_product.quantity,`order`.`user_id`,`order`.`tax` ,`order`.`created_at`, order_product.product_id,order_product.quantity FROM order_product INNER JOIN `order` ON `order`.`id` = order_product.order_id INNER JOIN users ON users.id = `order`.`user_id` INNER JOIN product ON product.id = order_product.product_id INNER JOIN bill_address ON bill_address.id = `order`.`address_id` INNER JOIN product_image ON product.id = product_image.product_id where `order`.`id` = "' +
            req.params.order_id +
            '" GROUP BY product.id',
          async (err, rawResult) => {
            if (err) {
              return res.serverError(
                err,
                messages.SOMETHING_WENT_WRONG,
                response.RESPONSE_STATUS.error,
              );
            }
  
            if (rawResult.rows && rawResult.rows.length > 0) {
              let values = [];
              let total = [];
              for (let item of rawResult.rows) {
                item.subTotal = item.price * item.quantity;
                total.push(item.subTotal);
                values.push(item);
              }
  
              let sum = 0;
              total.map(data => sum += data);
              const address = await findOne('Bill_Address', {
                id: rawResult.rows[0].address_id,
              });
              const countryData = await findOne('Country', {
                id: address.country_id,
              });
              const stateData = await findOne('State', { id: address.state_id });
              const cityData = await findOne('City', { id: address.city_id });
  
              address.country_id = countryData.country_name;
              address.state_id = stateData.state_name;
              address.city_id = cityData.city_name;
  
              values.push({ total_amount: sum });
              let obj = { address: address, order: values };
  
              return res.ok(
                obj,
                undefined,
                response.RESPONSE_STATUS.success,
              );
            } else {
              return res.ok(
                undefined,
                messages.ID_NOT_FOUND,
                response.RESPONSE_STATUS.error,
              );
            }
          },
        );
      } else {
        res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} order invoice.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },
};