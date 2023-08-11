/***************************************************************************

  Model            : Search_history
  Database Table   : search_history

  *************************
  Column           : type
  *************************
  user_id          : number
  message          : string
  created_at       : datetime
  updated_at       : datetime
  *************************

***************************************************************************/

const Moment = require('moment');
module.exports = {
  attributes: {
    user_id: {
      type     : 'number',
      required : true
    },
    message: {
      type     : 'string',
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
