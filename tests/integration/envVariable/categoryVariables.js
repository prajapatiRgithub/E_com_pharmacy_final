module.exports = {
  categoryData: {
    name        : 'raj',
    order       : 1,
    description : 'abc',
  },
  checkValidation: {
    name        : 12,
    order       : 1,
    description : 'abc',
  },
  missingCategoryData: {
    order       : 1,
    description : 'abc',
  },
  updateCategoryData: {
    name        : 'om',
    order       : 3,
    description : 'xyz',
  },
  deleteCategoryData: {
    is_archived : true,
  },
  wrongDeleteCategoryData: {
    is_archived : 'abc',
  },
  checkEmptyValidation: {
    name        : '',
    order       : 1,
    description : 'abc',
  },
};