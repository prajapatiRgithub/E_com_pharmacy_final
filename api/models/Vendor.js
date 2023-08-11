/***************************************************************************

  Model          : Vendor
  Database Table : vendor

  *************************
  Column         :   type
  *************************
  is_archived    :  boolean
  first_name     :  string
  last_name      :  string
  dob            :  date
  gender         :  string
  phone_no       :  string
  address        :  string
  email_id       :  string
  password       :  string
  company_name   :  string
  city_id        :  number
  state_id       :  number
  country_id     :  number
  zip_code       :  string
  is_kyc         :  boolean
  created_at     :  datetime
  updated_at     :  datetime
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
    dob: {
      type       : 'string',
      columnType : 'date',
      allowNull: true,
    },
    gender: {
      type     : 'string',
      isIn     : ['male', 'female', 'other'],
      allowNull: true,
    },
    phone_no: {
      type     : 'string',
      required : false,
    },
    address: {
      type     : 'string',
      required : false,
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
    company_name: {
      type     : 'string',
      required : false,
    },
    country_id: {
      model    : 'Country',
      through  : 'id',
      required : false
    },
    city_id: {
      model    : 'City',
      through  : 'id',
      required : false
    },
    state_id: {
      model    : 'State',
      through  : 'id',
      required : false
    },
    zip_code: {
      type     : 'number',
      required : false,
    },
    is_kyc: {
      type       : 'boolean',
      defaultsTo : false,
    },
    status: {
      type       : 'number',
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
    },
  },
  customToJSON: function () {
    // Return a shallow copy of this record with the password removed.
    return _.omit(this, ['password', 'created_at', 'updated_at']);    
  }
};