/***************************************************************************

  Model            : Product_Image
  Database Table   : product_image

  *************************
  Column           :   type
  *************************
  is_archived      :  boolean
  product_id       :  number
  image            :  string
  created_at       :  datetime
  updated_at       :  datetime
  *************************

***************************************************************************/

const Moment = require('moment');
module.exports = {
  attributes: {
    product_id: {
      model    : 'Product',
      through  : 'id',
      required : false
    },
    image: {
      type     : 'string',
      required : false,
    },
    status: {
      type       : 'boolean',
      defaultsTo : false,
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