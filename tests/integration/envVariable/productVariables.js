module.exports = {
  productData: {
    is_prescription    :false,
    vendor_id          : 1,
    category_id        : 1,
    name               : 'ram',
    description        : 'hello',
    price              : 90,
    quantity           : 1,
    metaTagTitle       : 'abc',
    metaTagDescription : 'hello',
    metaTagKeywords    : 'abc',
    referral_code      : 'AfWadW',
    composition        : 'abc',
    presentation       : 'abc',
    storage            : 'abc',
    indication         : 'abc',
    dose               : 'new',
    shelf_life         : 'abc'
  },
  checkValidation: {
    is_prescription    : true,
    vendor_id          : 1,
    category_id        : 1,
    name               : 12,
    description        : 'hello',
    price              : 90,
    quantity           : 1,
    metaTagTitle       : 'abc',
    metaTagDescription : 'hello',
    metaTagKeywords    : 'abc',
    referral_code      : 'AfWadW',
    composition        : 'abc',
    presentation       : 'abc',
    storage            : 'abc',
    indication         : 'abc',
    dose               : 'new',
    shelf_life         : 'abc'
  },
  missingProductData: {
    is_prescription    :false,
    category_id        : 1,
    name               : 12,
    description        : 'hello',
    price              : 90,
    quantity           : 1,
    metaTagTitle       : 'abc',
    metaTagDescription : 'hello',
    metaTagKeywords    : 'abc',
    referral_code      : 'AfWadW',
    composition        : 'abc',
    presentation       : 'abc',
    storage            : 'abc',
    indication         : 'abc',
    dose               : 'new',
    shelf_life         : 'abc'
  },
  updateProductData: {
    is_prescription    :false,
    vendor_id          : 1,
    category_id        : 1,
    name               : 'ram',
    description        : 'hello',
    price              : 90,
    quantity           : 1,
    metaTagTitle       : 'abc',
    metaTagDescription : 'hello',
    metaTagKeywords    : 'abc',
    referral_code      : 'AfWadW',
    composition        : 'abc',
    presentation       : 'abc',
    storage            : 'abc',
    indication         : 'abc',
    dose               : 'new',
    shelf_life         : 'abc'
  },
  checkObjectValidation: {
    status : true,
	sort   : [],
	limit  : 1
  },
  insertData: {
    product_id : 1
  },
  deleteProductData: {
    is_archived : true,
  },
  wrongDeleteProductData: {
    is_archived : 'abc',
  },
  ProductImageData: {
    product_id : 1
  },
  checkProductImageData: {
    product_id : 'abc'
  },
  checkEmptyValidation: {
    is_prescription    :false,
    vendor_id          : 1,
    category_id        : 1,
    name               : '',
    description        : 'hello',
    price              : 90,
    quantity           : 1,
    metaTagTitle       : 'abc',
    metaTagDescription : 'hello',
    metaTagKeywords    : 'abc',
    referral_code      : 'AfWadW',
    composition        : 'abc',
    presentation       : 'abc',
    storage            : 'abc',
    indication         : 'abc',
    dose               : 'new',
    shelf_life         : 'abc'
  },
  listOfEmptyValidation: {
    status : true,
    sort   : {},
    limit  : 1 
  }
};
