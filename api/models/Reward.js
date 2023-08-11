/***************************************************************************

  Model            : Reward
  Database Table   : reward

  *************************
  Column           : type
  *************************
  is_archived      : boolean
  user_id          : number
  coupon_code      : string
  amount           : number
  created_at       : datetime
  updated_at       : datetime
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
      type     : 'number',
      required : true
    },
    coupon_code: {
      type     : 'string',
      required : true,
    },
    amount: {
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
