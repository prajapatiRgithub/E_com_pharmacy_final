/***************************************************************************

  Model            : Product
  Database Table   : product

  *************************
  Column           : type
  *************************
  is_archived      : boolean
  is_prescription  : boolean
  vendor_id        : number   
  category_id      : number
  name             : string
  description      : string
  price            : number
  image            : json
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
    is_prescription: {
      type       : 'boolean',
      defaultsTo : false,
    },
    vendor_id: {
      model    : 'Vendor',
      through  : 'id',
      required : true,
    },
    category_id: {
      model    : 'category',
      through  : 'id',
      required : true
    },
    name: {
      type     : 'string',
      required : true,
    },
    description: {
      type     : 'string',
      required : true,
    },
    price: {
      type     : 'number',
      required : true,
    },
    image: {  
      type        : 'json',
      defaultsTo  : null
    },
    quantity: {
      type     : 'number',
      required : true
    },
    metaTagTitle: {
      type     : 'string',
      required : true
    },
    metaTagDescription: {
      type     : 'string',
      required : false
    },
    metaTagKeywords: {
      type     : 'string',
      required : false
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
