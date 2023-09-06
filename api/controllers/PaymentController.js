/* eslint-disable camelcase */
const paymentValidation = require('../validations/PaymentValidation');
const paymentIdValidation = require('../validations/IdValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const { create, findPopulate } = require('../services/serviceLayer');

module.exports = {
  addPayment: async (req, res) => {
    try {
      const isValidation = paymentValidation.paymentValidate.validate(req.body);
      if (!isValidation.error) {
        const paymentData = await create('Payment', req.body);
        if (paymentData && Object.keys(paymentData).length > 0) {
          return res.ok(
            { order_id: paymentData.order_id,
            payment_id : paymentData.id
            },
            `Payment ${messages.ADD_DATA}`,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.notFound(
            undefined,
            messages.DATA_NOT_FOUND,
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
        `${messages.REQUEST_FAILURE} add payment`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  historyOfPayment: async (req, res) => {
    try {
      const isValidation = paymentIdValidation.orderIdValidation.validate(
        req.params
      );
      if (!isValidation.error) {
        const historyOfPaymentData = await findPopulate('Payment', req.params, [
          'order_id',
        ]);
        if (historyOfPaymentData && historyOfPaymentData.length > 0) {
          const data = historyOfPaymentData.map((item) => {
            return {
              user_id        : item.user_id,
              order_id       : item.order_id.id,
              payment_type   : item.payment_type,
              payment_status : item.payment_status,
              tax            : item.order_id.tax,
              coupon_code    : item.order_id.coupon_code,
              discount       : item.order_id.discount,
              total_amount   : item.order_id.total_amount,
              status         : item.order_id.status
            };
          });
          return res.ok(
            data,
            messages.GET_HISTORY_OF_PAYMENT,
            response.RESPONSE_STATUS.success
          );
        } else {
          res.ok(
            undefined,
            messages.ID_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} history of payment`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
