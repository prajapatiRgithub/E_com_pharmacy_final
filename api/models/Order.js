/***************************************************************************

  Model            : Order
  Database Table   : order

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  user_id          :  number
  address_id       :  number
  tax              :  number
  coupon_code      :  string
  discount         :  number
  total_amount     :  number
  status           :  string
  created_at       :  datetime
  updated_at       :  datetime
  *************************

***************************************************************************/

const Moment = require('moment');
module.exports = {
  attributes: {
    is_archived: {
      type       : 'boolean',
      defaultsTo : false,
    },
    user_id: {
      model    : 'Users',
      through  : 'id',
      required : true
    },
    address_id: {
      model    : 'Bill_Address',
      through  : 'id',
      required : true
    },
    shipping_id: {
      model    : 'Bill_Address',
      through  : 'id',
      required : false,
    },
    tax: {
      type     : 'number',
      required : false
    },
    coupon_code: {
      type     : 'string',
      required : false
    },
    discount: {
      type     : 'number',
      required : false
    },
    total_amount: {
      type     : 'number',
      required : true,
    },
    status: {
      type       : 'string',
      isIn       : ['Rejected', 'Confirmed', 'Pending', 'Success', 'Failed', 'Approve', 'Processing'],
      defaultsTo : 'Pending',
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