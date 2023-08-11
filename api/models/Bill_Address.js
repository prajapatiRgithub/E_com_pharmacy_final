/***************************************************************************

  Model            : Bill_Address
  Database Table   : bill_address

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  user_id          :  number
  address_line_1   :  string
  address_line_2   :  string
  alternative_no   :  string
  city_id          :  number
  state_id         :  number
  country_id       :  number
  zip_code         :  string
  place            :  string
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
    address_line_1: {
      type     : 'string',
      required : false,
    },
    address_line_2: {
      type     : 'string',
      required : false,
    },
    alternative_no: {
      type     : 'string',
      required : false,
    },
    city_id: {
      model    : 'Country',
      through  : 'city_id',
      required : false,
    },
    state_id: {
      model    : 'Country',
      through  : 'state_id',
      required : false,
    },
    country_id: {
      model    : 'Country',
      through  : 'country_id',
      required : false,
    },
    zip_code: {
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
    }
  },
  customToJSON: function () {
    // Return a shallow copy of this record with the created_at,updated_at removed.
    return _.omit(this, ['created_at', 'updated_at']);    
  }
};