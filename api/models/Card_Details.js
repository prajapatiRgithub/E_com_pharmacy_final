/***************************************************************************

  Model            : Card_Details
  Database Table   : card_details

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  user_id          :  number
  card_number      :  number
  card_holdername  :  string
  card_type        :  string
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
    card_number: {
      type     : 'number',
      required : true,
    },
    card_holdername: {
      type     : 'string',
      required : true,
    },
    card_type: {
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
    }
  }
};
