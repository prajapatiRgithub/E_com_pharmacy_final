module.exports = {
  //Coupon Module Variables
  couponData: {
    coupon_code : 'BeqWEa',
    start_date  : '2000-07-19',
    end_date    : '2022-09-12',
    product_id  : 1,
    condition   : 'opq',
    min_amount  : 100
  },
  missingCouponData: {
    coupon_code : 'teYNpu',
    start_date  : '2000-07-19',
    end_date    : '2022-09-12',
    condition   : 'xyz',
    min_amount  : 100
  },
  checkValidation: {
    coupon_code : 'teYNpu',
    start_date  : '2000-07-19',
    end_date    : '2022-09-12',
    product_id  : 1,
    condition   : 12,
    min_amount  : 100
  },
  checkEmptyValidation: {
    coupon_code : '',
    start_date  : '2000-07-19',
    end_date    : '2022-09-12',
    product_id  : 1,
    condition   : 'opq',
    min_amount  : 100
  }
};
