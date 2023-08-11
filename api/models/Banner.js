/***************************************************************************

  Model            : Banner
  Database Table   : banner

  *************************
  Column           :  type
  *************************
  is_archived      : boolean
  image            : json
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
    image: {
        type     : 'json',
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
    }
  }
};