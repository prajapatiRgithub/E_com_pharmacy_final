/***************************************************************************

  Model            : Payment
  Database Table   : payment

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  user_id          :  number
  order_id         :  number
  payment_type     :  string
  payment_status   :  string
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
    order_id: {
      model    : 'Order',
      through  : 'id',
      required : true
    },
    payment_type: {
      type     : 'number',
      required : true,
    },
    payment_status: {
      type       : 'string',
      isIn       : ['success', 'pending', 'failed'],
      defaultsTo : 'pending',
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