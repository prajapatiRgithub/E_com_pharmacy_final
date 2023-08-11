/***************************************************************************

  Model            : Prescription
  Database Table   : prescription

  *************************
  Column           :   type
  *************************
  user_id          :  number
  status           :  number
  created_at       :  datetime
  updated_at       :  datetime
  *************************

***************************************************************************/

const Moment = require('moment');
module.exports = {
  attributes: {
    user_id: {
      model    : 'Users',
      through  : 'id',
      required : true
    },
    status: {
      type     : 'number',
      defaultsTo : 2,
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