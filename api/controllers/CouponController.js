const couponValidation = require('../validations/CouponValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const { create, findPopulate } = require('../services/serviceLayer');

module.exports = {
  addCouponCode: async (req, res) => {
    try {
      const isValidation = couponValidation.couponValidate.validate(req.body);
      if (!isValidation.error) {
        const couponData = await create('Coupon', req.body);
        if (couponData && Object.keys(couponData).length > 0) {
          return res.ok(
            undefined,
            `Coupon ${messages.ADD_DATA}`,
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
        `${messages.REQUEST_FAILURE} add coupon code.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  listOfCoupon: async (req, res) => {
    try {
      const listOfCouponData = await findPopulate('Coupon', undefined, [
        'product_id',
      ]);
      if (listOfCouponData.length > 0) {
        const data = listOfCouponData.map((item) => {
          return {
            id          : item.id,
            name        : item.product_id.name,
            price       : item.product_id.price,
            description : item.product_id.description,
            start_date  : item.start_date,
            end_date    : item.end_date,
          };
        });
        return res.ok(
          data,
          messages.GET_LIST_OF_COUPON,
          response.RESPONSE_STATUS.success
        );
      } else {
        return res.notFound(
          undefined,
          messages.DATA_NOT_FOUND,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} list of coupon.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
