/***************************************************************************

  Model            : Product_Details
  Database Table   : product_details

  *************************
  Column           : type
  *************************
  product_id       : number
  referral_code    : string
  compositon       : string
  presentation     : string
  storage          : string
  indication       : string
  dose             : string
  shelf_life       : string
  created_at       : datetime
  updated_at       : datetime
  *************************

***************************************************************************/

const moment = require('moment');
module.exports = {
  attributes: {
    product_id: {
      model    : 'Product',
      through  : 'id',
      required : true
    },
    referral_code: {
      type     : 'string',
      required : false
    },
    composition: {
      type     : 'string',
      required : false
    },
    presentation: {
      type     : 'string',
      required : false
    },
    storage: {
      type     : 'string',
      required : false
    },
    indication: {
      type     : 'string',
      required : false
    },
    dose: {
      type     : 'string',
      required : false
    },
    shelf_life: {
      type     : 'string',
      required : false
    },
    created_at: {
      type       : 'string',
      columnType : 'date',
      defaultsTo : moment().format('YYYY-MM-DD h:mm:ss')
    },
    updated_at: {
      type       : 'string',
      columnType : 'date',
      defaultsTo : moment().format('YYYY-MM-DD h:mm:ss')
    },
  }
};
