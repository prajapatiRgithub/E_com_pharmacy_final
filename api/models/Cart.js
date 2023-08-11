/***************************************************************************

  Model            : Cart
  Database Table   : cart

  *************************
  Column           :   type
  *************************
  user_id          :  number
  product_id       :  number
  quantity         :  number
  prescription     :  string
  created_at       :  datetime
  updated_at       :  datetime
  *************************

***************************************************************************/

const Moment = require('moment');
module.exports = {
  attributes: {
    is_Deleted: {
      type       : 'boolean',
      defaultsTo : true,
    },
    user_id: {
      model    : 'Users',
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
    prescription: {
      type     : 'string',
      required : false,
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
    }
  }
};