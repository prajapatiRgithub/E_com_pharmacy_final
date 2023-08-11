module.exports = {
  // Payment Module Variable's
  paymentData: {
    user_id        : 1,
    order_id       : 1,
    payment_type   : 1,
    payment_status : 'success'
  },
  checkValidation: {
    user_id        : 1,
    order_id       : 'xyz',
    payment_type   : 1,
    payment_status : 'pending'
  },
  missingPaymentData: {
    user_id        : 1,
    order_id       : 1,
    payment_status : 'failed'
  },
  checkEnumValidation: {
    user_id        : 1,
    order_id       : 1,
    payment_type   : 1,
    payment_status : 'abc'
  }
};
