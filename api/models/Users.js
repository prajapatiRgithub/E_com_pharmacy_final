/***************************************************************************

  Model          : Users
  Database Table : users

  *************************
  Column         : type
  *************************
  is_archived    : boolean
  first_name     : string
  last_name      : string
  email_id       : string
  password       : string
  dob            : date
  gender         : string
  phone_no       : string
  referral_code   : string
  created_at     : datetime
  updated_at     : datetime
  *************************

***************************************************************************/

const Moment = require('moment');
module.exports = {
  attributes: {
    is_archived: {
      type       : 'boolean',
      defaultsTo : false,
    },
    first_name: {
      type     : 'string',
      allowNull: true,
    },
    last_name: {
      type     : 'string',
      allowNull: true,
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
    dob: {
      type       : 'string',
      columnType : 'date',
      allowNull: true,
    },
    gender: {
      type     : 'string',
      isIn     : ['male','female','other'],
      allowNull: true,
    },
    phone_no: {
      type     : 'string',
      required : false,
    },
    country_id: {
      model    : 'Country',
      through  : 'id',
      required : false,
    },
    state_id: {
      model    : 'State',
      through  : 'id',
      required : false,
    },
    city_id: {
      model    : 'City',
      through  : 'id',
      required : false,
    },
    referral_code: {
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
  customToJSON: function () {
    // Return a shallow copy of this record with the password removed.
    return _.omit(this, ['password', 'updated_at']);    
  }
};
