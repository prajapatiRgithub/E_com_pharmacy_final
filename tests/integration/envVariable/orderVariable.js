module.exports = {
  orderDetails: {
    user_id    : 78,
    address_id : 1,
    product_id : [1],
    quantity   : [2],
    tax        : 10,
  },
  stringInUserId: {
    user_id    : "sdfsd",
  },
  stringInProductId: {
    user_id    : 78,
    address_id : 1,
    product_id : "sdsdf"
  },
  emptyProductId: {
    user_id    : 78,
    address_id : 1,
    product_id : []
  },
  flagValidation: {
    id : 141,
    flag : "adsdf"
  },
  invalidId: {
    id   : 1000,
    flag : true
  },
  stringFlagValidation: {
    id : 141,
    flag : "adsdf"
  },
  invalidOrderStatusId: {
    id   : 1000,
    flag : 1
  },
};
