/***************************************************************************

  Model            : Category
  Database Table   : category

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  name             :  string
  description      :  string
  image            :  string
  order            :  number
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
    name: {
      type     : 'string',
      required : true,
    },
    description: {
      type     : 'string',
      required : false,
    },
    image: {
      type     : 'string',
      required : false,
    },
    order: { 
      type     : 'number',
      required : false,
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