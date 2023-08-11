/***************************************************************************

  Model            : PaymentType
  Database Table   : payment_type

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  payment_type     :  number
  charges          :  number
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
    payment_type: {
      type     : 'number',
      required : true
    },
    charges: {
      type     : 'number',
      required : true,
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
