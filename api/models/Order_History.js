/***************************************************************************

  Model            : Order_history
  Database Table   : order_history

  *************************
  Column           :   type
  *************************
  order_id         :  number
  status           :  string
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