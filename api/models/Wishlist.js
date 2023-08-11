/***************************************************************************

  Model            : Wishlist
  Database Table   : wishlist

  *************************
  Column           : type
  *************************
  is_archived      : boolean
  product_id       : number
  user_id          : number
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
    product_id: {
      model    : 'Product',
      through  : 'id',
      required : true
    },
    user_id: {
      model    : 'Users',
      through  : 'id',
      required : true
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
