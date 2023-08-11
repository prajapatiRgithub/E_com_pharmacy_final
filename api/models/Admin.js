/***************************************************************************

  Model            : Admin
  Database Table   : admin

  *************************
  Column           :  type
  *************************
  is_archived      : boolean
  name             : string
  email_id         : string
  password         : string
  role             : role
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
    name: {
      type     : 'string',
      required : true,
    },
    email_id: {
      type     : 'string',
      unique   : true,
      required : true,
    },
    password: {
      type     : 'string',
      required : true,
    },
    role: {
      type     : 'string',
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
    },
  },
};
