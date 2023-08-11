/***************************************************************************

  Model            : Country
  Database Table   : country

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  country_name     :  string
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
    country_name: {
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
  customToJSON: function () {
    // Return a shallow copy of this record with the created_at, updated_at removed.
    return _.omit(this, ['created_at', 'updated_at']);    
  }
};
