/***************************************************************************

  Model            : Coupon
  Database Table   : coupon

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  coupon_code      :  string
  condition        :  string
  min_amount       :  number
  start_date       :  date
  end_date         :  date
  product_id       :  number
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
    coupon_code: {
      type     : 'string',
      required : true,
    },
    condition: {
      type     : 'string',
      required : false,
    },
    min_amount: {
      type     : 'number',
      required : false,
    },
    start_date: {
      type       : 'string',
      columnType : 'date',
      required   : true,
    },
    end_date: {
      type       : 'string',
      columnType : 'date',
      required   : true,
    },
    product_id: {
      model    : 'Product',
      through  : 'id',
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