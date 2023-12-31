/* eslint-disable camelcase */
const productValidation = require('../validations/ProductValidation');
const productIdValidation = require('../validations/IdValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const envVariables = require('../utils/constants/envVariables');
const {
  create,
  updateOne,
  reportService,
  findOne,
} = require('../services/serviceLayer');
const { verify } = require("../services/jwt");
const categoryValidation = require('../validations/CategoryValidations');

module.exports = {
  addProduct: async (req, res) => {
    try {
      const {
        is_prescription,
        vendor_id,
        category_id,
        name,
        description,
        price,
        quantity,
        metaTagTitle,
        metaTagDescription,
        metaTagKeywords,
        referral_code,
        composition,
        presentation,
        storage,
        indication,
        dose,
        shelf_life,
      } = req.body;
      const products = {
        is_prescription,
        vendor_id,
        category_id,
        name,
        description,
        price,
        quantity,
        metaTagTitle,
        metaTagDescription,
        metaTagKeywords,
      };
      const product_details = {
        referral_code,
        composition,
        presentation,
        storage,
        indication,
        dose,
        shelf_life,
      };

      const isValidate = productValidation.productValidate.validate(req.body);
      if (!isValidate.error) {
        const productData = await create('Product', products);
        if (productData && Object.keys(productData).length > 0) {
          product_details.product_id = productData.id;

          await create('Product_Details', product_details);
          return res.ok(
            { id: productData.id },
            `Product ${messages.ADD_DATA}`,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.notFound(
            undefined,
            messages.DATA_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} added Product.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  editProduct: async (req, res) => {
    try {
      const {
        is_prescription,
        vendor_id,
        category_id,
        name,
        description,
        price,
        quantity,
        metaTagTitle,
        metaTagDescription,
        metaTagKeywords,
        referral_code,
        composition,
        presentation,
        storage,
        indication,
        dose,
        shelf_life,
      } = req.body;
      const products = {
        is_prescription,
        vendor_id,
        category_id,
        name,
        description,
        price,
        quantity,
        metaTagTitle,
        metaTagDescription,
        metaTagKeywords,
      };
      const product_details = {
        referral_code,
        composition,
        presentation,
        storage,
        indication,
        dose,
        shelf_life,
      };

      const idValidate = productIdValidation.productIdValidation.validate(req.params);
      const isValidate = productValidation.productEditValidate.validate(
        req.body
      );
      const { product_id } = req.params;

      if (!idValidate.error && !isValidate.error) {
        const productData = await updateOne(
          'Product',
          { id: product_id },
          products
        );
        if (productData && productData.length > 0) {
          await updateOne('Product_Details', { product_id }, product_details);
          return res.ok(
            undefined,
            messages.UPDATE_PRODUCT_SUCCESS,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.ok(
            undefined,
            messages.ID_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          idValidate.error ? idValidate.error : isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} edit Product.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const idValidate = productIdValidation.idValidation.validate(req.params)
      const isValidate = productValidation.ProductDeleteValidate.validate(
        req.body
      );
      if (!idValidate.error && !isValidate.error) {
        const data = await updateOne('Product', req.params, req.body);
        if (data && data.length > 0) {
          return res.ok(
            undefined,
            `Product ${messages.DELETE_SUCCESS}`,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.ok(
            undefined,
            messages.ID_NOT_FOUND,
            response.RESPONSE_STATUS.error
          );
        }
      } else {
        return res.badRequest(
          idValidate.error ? idValidate.error : isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} delete Product.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  productImage: async (req, res) => {
    try {
      const isValidation = productIdValidation.productIdValidation.validate(
        req.body
      );
      if (!isValidation.error) {
        req
          .file('image')
          .upload({ dirname: envVariables.path }, async (err, uploadFile) => {
            let data = {};
            if (err) {
              return res.serverError(
                err,
                messages.SOMETHING_WENT_WRONG,
                response.RESPONSE_STATUS.error
              );
            }
            if (uploadFile && uploadFile.length === 0) {
              return res.badRequest(
                undefined,
                messages.IMAGE_VALIDATIONS,
                response.RESPONSE_STATUS.error
              );
            }
            let filename = '';
            if (uploadFile && uploadFile.length > 0) {
              filename = uploadFile[0].fd.split('/').slice(-1)[0];
            }

            data.image = filename;
            data.product_id = req.body.product_id;

            const addImage = await create('Product_Image', data);

            if (addImage && Object.keys(addImage).length > 0) {
              return res.ok(
                undefined,
                `Image ${messages.ADD_DATA}`,
                response.RESPONSE_STATUS.success
              );
            } else {
              return res.notFound(
                undefined,
                messages.DATA_NOT_FOUND,
                response.RESPONSE_STATUS.error
              );
            }
          });
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} product image.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  viewProduct: async (req, res) => {
    try {
      let token = req.headers.authorization;
      let decodedToken;
      if (token) {
        decodedToken = verify(token);
      }

      const isValidation = productIdValidation.productIdValidation.validate(
        req.params
      );
      if (!isValidation.error) {
        Order.query(
          'SELECT GROUP_CONCAT(product_image.image) as image,product.id, product.vendor_id, product.category_id, category.name as categoryName, product.name, product.description, product.price, product.quantity,product.metaTagTitle, product.metaTagDescription, product.metaTagKeywords, product_details.composition, product_details.composition, product_details.presentation, product_details.storage, product_details.indication, product_details.dose, product_details.shelf_life FROM product_image INNER JOIN product ON product_image.product_id = product.id INNER JOIN product_details ON product_details.product_id = product.id INNER JOIN category ON category.id = product.category_id where product_details.product_id = "' +
            req.params.product_id +
            '"',
         async (err, rawResult) => {
            if (err) {
              return res.serverError(
                err,
                messages.SOMETHING_WENT_WRONG,
                response.RESPONSE_STATUS.error
              );
            }
            if (rawResult.rows && rawResult.rows.length > 0) {

              let id = 0;
              if (decodedToken){
               id = decodedToken.id
              }

              const wishList = await findOne('Wishlist', {and:[{ product_id: req.params.product_id, user_id: id}]});

              if (wishList && Object.keys(wishList).length > 0) {
                rawResult.rows[0].flag = 1;
              } else {
                rawResult.rows[0].flag = 0;
              }

              return res.ok(
                rawResult.rows,
                undefined,
                response.RESPONSE_STATUS.success
              );
            } else {
              return res.ok(
                undefined,
                messages.ID_NOT_FOUND,
                response.RESPONSE_STATUS.error
              );
            }
          }
        );
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (error) {
      return res.serverError(
        error,
        `${messages.REQUEST_FAILURE} view product.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  listOfProducts: async (req, res) => {
    try {
      let token = req.headers.authorization;
      let decodedToken;
      if (token) {
        decodedToken = verify(token);
      }

      let isValidation = productValidation.listOfProduct.validate(req.body);
      if (!isValidation.error) {
        let sql ='SELECT product_image.image as image, product.is_archived, product.is_prescription, product.id as product_id, product.vendor_id, product.category_id,  category.name as categoryName, product.name, product.description, product.price, product.quantity,product.metaTagTitle, product.metaTagDescription, product.metaTagKeywords FROM product_image INNER JOIN product ON product_image.product_id = product.id LEFT OUTER JOIN category ON category.id = product.category_id where product.is_archived = false ' ;
        const updatedSql = await reportService(
          sql,
          undefined,
          'is_prescription',
          req.body,
          undefined,
          undefined,
          ' GROUP BY product_image.product_id'
        );

        Order.query(updatedSql, async (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.SOMETHING_WENT_WRONG,
              response.RESPONSE_STATUS.error
            );
          }
          if (rawResult.rows && rawResult.rows.length > 0) {
            let productDetails = [];  

            for (let item of rawResult.rows) {
              const productData = await findOne('Product_Details', {product_id: item.product_id})
              if (productData  && Object.keys(productData).length > 0) {
                productDetails.push(productData)
              }
            }

            let result = [];
            let values = {};
            
            if (productDetails && productDetails.length <= 0) {
              return res.ok(
                rawResult.rows,
                undefined,
                response.RESPONSE_STATUS.success
                );
              } else {
              productDetails.forEach((item) => {
                values[item.product_id] = item;
              });              
              rawResult.rows.map((item)=>{
                if(values[item.product_id]){
                  return result.push({
                  ...item,
                  ...values[item.product_id]
                })
                } else {
                 return result.push(item)
                }
              })
            }

           let id = 0;
           if (decodedToken){
            id = decodedToken.id
           }

            for (let item of result) {
              const wishList = await findOne('Wishlist', {and:[{ product_id: item.product_id, user_id: id}]});

              if (wishList && Object.keys(wishList).length > 0) {
                item.flag = 1;
              } else {
                item.flag = 0;
              }
            }
            return res.ok(
              result,
              undefined,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.notFound(
              undefined,
              messages.DATA_NOT_FOUND,
              response.RESPONSE_STATUS.error
            );
          }
        });
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (error) {
      return res.serverError(
        error,
        `${messages.REQUEST_FAILURE} view product.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  deleteMultipleProduct: async (req, res) => {
    try {
      const isValidate = categoryValidation.multipleArray.validate(req.body);
      if (!isValidate.error) {
        let { id, is_archived } = req.body;

        await Product.update({ id }, { is_archived }).exec(async function afterwards(
          err,
          deleteData
        ) {
          if (err) {
            return res.serverError(
              err,
              `${messages.REQUEST_FAILURE} delete multiple product.`,
              response.RESPONSE_STATUS.error
            );
          }
            return res.ok(
              deleteData,
              `Product ${messages.DELETE_SUCCESS}`,
              response.RESPONSE_STATUS.success
            );
        });
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} delete multiple product.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};