/***************************************************************************

  Model            : Order_product
  Database Table   : order_product

  *************************
  Column           :   type
  *************************
  order_id         :  number
  item_id          :  number
  created_at       :  datetime
  updated_at       :  datetime
  *************************

***************************************************************************/

const Moment = require('moment');
module.exports = {
  attributes: {
    order_id: {
      model    : 'Order',
      through  : 'id',
      required : true
    },
    product_id: {
      model    : 'Product',
      through  : 'id',
      required : true
    },
    quantity: {
      type     : 'number',
      required : true
    },
    created_at: {
      type       : 'string',
      columnType : 'date',
      defaultsTo : Moment().format('YYYY-MM-DD h:mm:ss'),
    },
    updated_at: {
      type       : 'string',
      columnType : 'date',
      defaultsTo : Moment().format('YYYY-MM-DD h:mm:ss'),
    },
  },
};
