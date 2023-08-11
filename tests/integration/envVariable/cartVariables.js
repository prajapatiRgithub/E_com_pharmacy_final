module.exports = {
  cartData: {
    user_id      : 2,
    product_id   : 2,
    quantity     : 3,
    prescription : "xyz",
  },
  checkValidationAddToCart: {
    user_id      : "ram",
    product_id   : 2,
    quantity     : 3,
    prescription : "anc",
  },
  missingCartData: {
    user_id      : 1,
    quantity     : 3,
    prescription : "anc",
  },
  cartUpdateData: {
    quantity : 10,
  },
  wrongUpdateData: {
    quantity : "raj",
  },
  insertData : {
    user_id : 2
  }
};
