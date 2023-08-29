/* eslint-disable camelcase */
const Joi = require('joi');

module.exports = {
  productValidate: Joi.object().keys({
    is_prescription: Joi.boolean().empty().required().messages({
      'boolean.base'  : `Is prescription should be a type of boolean`,
      'boolean.empty' : 'Is prescription is not allowed to be empty',
      'any.required'  : `Is prescription is Required`,
    }),
    vendor_id: Joi.number().empty().required().messages({
      'number.base'  : `Vendor id should be a type of number`,
      'number.empty' : 'Vendor id is not allowed to be empty',
      'any.required' : `Vendor id is Required`,
    }),
    category_id: Joi.number().empty().required().messages({
      'number.base'  : `Category id should be a type of number`,
      'number.empty' : 'Category id is not allowed to be empty',
      'any.required' : `Category id is Required`,
    }),
    name: Joi.string().required().empty().messages({
      'string.base'  : `Name should be a type of text`,
      'string.empty' : `Name cannot be an empty field`,
      'any.required' : `Name is Required`,
    }),
    description: Joi.string().required().empty().messages({
      'string.base'  : `Description should be a type of text`,
      'string.empty' : `Description cannot be an empty field`,
      'any.required' : `Description is Required`,
    }),
    price: Joi.number().empty().required().messages({
      'number.base'  : `Price should be a type of number`,
      'number.empty' : `Price cannot be an empty field`,
      'any.required' : `Price is Required`,
    }),
    quantity: Joi.number().required().empty().messages({
      'number.base'  : `Quantity should be a type of number`,
      'number.empty' : `Quantity cannot be an empty field`,
      'any.required' : `Quantity is Required`,
    }),
    metaTagTitle: Joi.string().required().empty().messages({
      'string.base'  : `Meta tag title should be a type of text`,
      'string.empty' : `Meta tag title cannot be an empty field`,
      'any.required' : `Meta tag title is Required`,
    }),
    metaTagDescription: Joi.string().optional().allow('').messages({
      'string.base'  : `Meta tag title should be a type of text`,
    }),
    metaTagKeywords : Joi.string().optional().allow('').messages({
      'string.base' : `Meta tag keywords should be a type of text`,
    }),
    referral_code : Joi.string().optional().allow('').messages({
      'string.base' : `Referral code should be a type of text`,
    }),
    composition : Joi.string().optional().allow('').messages({
      'string.base' : `Composition should be a type of text`,
    }),
    presentation : Joi.string().optional().allow('').messages({
      'string.base' : `Presentation should be a type of text`,
    }),
    storage : Joi.string().optional().allow('').messages({
      'string.base' : `Storage should be a type of text`,
    }),
    indication : Joi.string().optional().allow('').messages({
      'string.base' : `Indication should be a type of text`,
    }),
    dose : Joi.string().optional().allow('').messages({
      'string.base' : `Dose should be a type of text`,
    }),
    shelf_life : Joi.string().optional().allow('').messages({
      'string.base' : `Shelf life should be a type of text`,
    }),
    image : Joi.array().optional().messages({
      'array.base'  : `image should be a type of array`,
    }),
    selectedImage : Joi.string().optional().allow('').messages({
      'string.base' : `Shelf life should be a type of text`,
    }),
  }),

  productEditValidate: Joi.object().keys({
    is_prescription: Joi.boolean().optional().allow('').messages({
      'boolean.base'  : `Is prescription should be a type of boolean`,
    }),
    vendor_id: Joi.number().optional().allow('').messages({
      'number.base'  : `Vendor id should be a type of number`,
    }),
    category_id: Joi.number().optional().allow('').messages({
      'number.base'  : `Category id should be a type of number`,
    }),
    name: Joi.string().optional().allow('').messages({
      'string.base'  : `Name should be a type of text`,
    }),
    description: Joi.string().optional().allow('').messages({
      'string.base'  : `Description should be a type of text`,
    }),
    price: Joi.number().optional().allow('').messages({
      'number.base'  : `Price should be a type of number`,
    }),
    quantity: Joi.number().optional().allow('').messages({
      'number.base'  : `Quantity should be a type of number`,
    }),
    metaTagTitle: Joi.string().optional().allow('').messages({
      'string.base'  : `Meta tag title should be a type of text`,
    }),
    metaTagDescription : Joi.string().optional().allow('').messages({
      'string.base' : `Meta tag description should be a type of text`,
    }),
    metaTagKeywords : Joi.string().optional().allow('').messages({
      'string.base' : `Meta tag keywords should be a type of text`,
    }),
    referral_code : Joi.string().optional().allow('').messages({
      'string.base' : `Referral code should be a type of text`,
    }),
    composition : Joi.string().optional().allow('').messages({
      'string.base' : `Composition should be a type of text`,
    }),
    presentation : Joi.string().optional().allow('').messages({
      'string.base' : `Presentation should be a type of text`,
    }),
    storage : Joi.string().optional().allow('').messages({
      'string.base' : `Storage should be a type of text`,
    }),
    indication : Joi.string().optional().allow('').messages({
      'string.base' : `Indication should be a type of text`,
    }),
    dose : Joi.string().optional().allow('').messages({
      'string.base' : `Dose should be a type of text`,
    }),
    shelf_life : Joi.string().optional().allow('').messages({
      'string.base' : `Shelf life should be a type of text`,
    }),
    image : Joi.array().optional().allow('').messages({
      'array.base'  : `image should be a type of array`,
    }),
    selectedImage : Joi.string().optional().allow('').messages({
      'string.base' : `Shelf life should be a type of text`,
    }),
  }),
  
  listOfProduct: Joi.object().keys({
    pageNumber: Joi.number().optional().allow('',null).messages({
      'number.base'  : `Page umber should be a type of number`,
    }),
    sort: Joi.object().optional().min(1).allow('',null).messages({
      'object.base'  : `Sort should be a type of object`,
    }),
    pageSize: Joi.number().optional().allow('',null).messages({
      'number.base'  : `Page Size should be a type of number`,
    }),
    status: Joi.boolean().optional().allow('').messages({
      'boolean.base' : `Status should be a type of boolean`
    }),
    productName: Joi.string().optional().allow('').messages({
      'string.base'  : `Name should be a type of text`,
    }),
    is_prescription: Joi.boolean().optional().allow('').messages({
      'boolean.base'  : `Is prescription should be a type of boolean`,
    }),
  }), 

  productImage: Joi.object().keys({ 
    product_id: Joi.number().empty().required().messages({
      'number.base'  : `Product id should be a type of number`,
      'number.empty' : 'Product id is not allowed to be empty',
      'any.required' : `Product id is Required`,
    }),
  }),

  ProductDeleteValidate: Joi.object().keys({
    is_archived: Joi.boolean().required().empty().messages({
      'boolean.base'  : `Is archived should be a type of boolean`,
      'boolean.empty' : 'Is archived is not allowed to be empty',
      'any.required'  : `Is archived is Required`,
    }),
  })
};
