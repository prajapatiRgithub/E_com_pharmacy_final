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
  deleteOne,
  findAll
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
        image,
        selectedImage,
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
        const productData = await create("Product", products);
        if (productData && Object.keys(productData).length > 0) {
          product_details.product_id = productData.id;

          await create("Product_Details", product_details);

          if (image && selectedImage) {
            for (let item of image) {
              let obj = { product_id: productData.id };
              if (item === selectedImage) {
                obj.image = item;
                obj.status = true;
              } else {
                obj.image = item;
              }
              await create("Product_Image", obj);
            }
          }

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
        image,
        selectedImage,
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

      const idValidate = productIdValidation.productIdValidation.validate(
        req.params
      );
      const isValidate = productValidation.productEditValidate.validate(
        req.body
      );
      const { product_id } = req.params;

      if (!idValidate.error && !isValidate.error) {
        const productData = await updateOne(
          "Product",
          { id: product_id },
          products
        );

        if (image && selectedImage) {
          for (let item of image) {
            let obj = { product_id };
            if (item === selectedImage) {
              obj.image = item;
              obj.status = true;
            } else {
              obj.image = item;
            }
            await create("Product_Image", obj);
          }
        }

        if (selectedImage) {
          const data = await findAll("Product_Image", {
            product_id,
            status: true,
          });
          if (data.image !== selectedImage) {
            await updateOne(
              "Product_Image",
              { id: data.id },
              { status: false }
            );
          }
          await updateOne(
            "Product_Image",
            { image: selectedImage },
            { status: true }
          );
        }

        if (productData && productData.length > 0) {
          await updateOne("Product_Details", { product_id }, product_details);
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
      const idValidate = productIdValidation.idValidation.validate(req.params);
      const isValidate = productValidation.ProductDeleteValidate.validate(
        req.body
      );
      if (!idValidate.error && !isValidate.error) {
        const data = await updateOne("Product", req.params, req.body);
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
          `SELECT
          product.id,
          product.is_prescription,
          product.vendor_id,
          product.category_id,
          category.name AS categoryName,
          product.name,
          product.description,
          product.price,
          product.quantity,
          product.metaTagTitle,
          product.metaTagDescription,
          product.metaTagKeywords,
          GROUP_CONCAT(
              CONCAT(
                  '{"id": "', product_image.id, '", "image": "', product_image.image, '", "status": "', product_image.status, '"}'
              )
              SEPARATOR ','
          ) AS images
      FROM
          product
      INNER JOIN
          product_image ON product_image.product_id = product.id
      INNER JOIN
          category ON category.id = product.category_id
      WHERE
          product.id = ${req.params.product_id} 
      GROUP BY
          product.id;
      `,
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
              if (decodedToken) {
                id = decodedToken.id;
              }

              const wishList = await findOne("Wishlist", {
                and: [{ product_id: req.params.product_id, user_id: id }],
              });

              if (wishList && Object.keys(wishList).length > 0) {
                rawResult.rows[0].flag = 1;
              } else {
                rawResult.rows[0].flag = 0;
              }

              let str = rawResult.rows[0].images;

              const jsonStrings = str.split("},{");

              const correctedJsonArray = jsonStrings.map((jsonStr, index) => {
                if (index === 0) {
                  return jsonStr + "}";
                } else if (index === jsonStrings.length - 1) {
                  return "{" + jsonStr;
                } else {
                  return "{" + jsonStr + "}";
                }
              });

              const jsonArray = correctedJsonArray.map((jsonStr) =>
                JSON.parse(jsonStr)
              );

              rawResult.rows[0].images = jsonArray;

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
        let sql =
          "SELECT product_image.image as image, product.is_archived, product.is_prescription, product.id as product_id, product.vendor_id, product.category_id,  category.name as categoryName, product.name, product.description, product.price, product.quantity,product.metaTagTitle, product.metaTagDescription, product.metaTagKeywords FROM product_image INNER JOIN product ON product_image.product_id = product.id LEFT OUTER JOIN category ON category.id = product.category_id where product.is_archived = false AND product_image.status = true ";
        const updatedSql = await reportService(
          sql,
          undefined,
          "is_prescription",
          req.body,
          undefined,
          undefined,
          " GROUP BY product_image.product_id"
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
              const productData = await findOne("Product_Details", {
                product_id: item.product_id,
              });
              if (productData && Object.keys(productData).length > 0) {
                productDetails.push(productData);
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
              rawResult.rows.map((item) => {
                if (values[item.product_id]) {
                  return result.push({
                    ...item,
                    ...values[item.product_id],
                  });
                } else {
                  return result.push(item);
                }
              });
            }

            let id = 0;
            if (decodedToken) {
              id = decodedToken.id;
            }

            for (let item of result) {
              const wishList = await findOne("Wishlist", {
                and: [{ product_id: item.product_id, user_id: id }],
              });

              if (wishList && Object.keys(wishList).length > 0) {
                item.flag = 1;
              } else {
                item.flag = 0;
              }
            }
            return res.ok(result, undefined, response.RESPONSE_STATUS.success);
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

        await Product.update({ id }, { is_archived }).exec(
          async function afterwards(err, deleteData) {
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
          }
        );
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

  searchProduct: async (req, res) => {
    try {
      let token = req.headers?.authorization;
      let decodedToken;
      if (token) {
        decodedToken = verify(token);
      }

      let isValidation = productValidation.listOfProduct.validate(req.body);
      if (!isValidation.error) {
        let sql =
          "SELECT product_image.image as image, product.is_archived, product.is_prescription, product.id as product_id, product.vendor_id, product.category_id,  category.name as categoryName, product.name, product.description, product.price, product.quantity,product.metaTagTitle, product.metaTagDescription, product.metaTagKeywords FROM product_image INNER JOIN product ON product_image.product_id = product.id LEFT OUTER JOIN category ON category.id = product.category_id where product.is_archived = false ";
        const updatedSql = await reportService(
          sql,
          undefined,
          "product.is_prescription",
          req.body,
          "product.name",
          undefined,
          " GROUP BY product_image.product_id"
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
              const productData = await findOne("Product_Details", {
                product_id: item.product_id,
              });
              if (productData && Object.keys(productData).length > 0) {
                productDetails.push(productData);
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
              rawResult.rows.map((item) => {
                if (values[item.product_id]) {
                  return result.push({
                    ...item,
                    ...values[item.product_id],
                  });
                } else {
                  return result.push(item);
                }
              });
            }

            let id = 0;
            if (decodedToken) {
              id = decodedToken.id;
            }

            for (let item of result) {
              const wishList = await findOne("Wishlist", {
                and: [{ product_id: item.product_id, user_id: id }],
              });

              if (wishList && Object.keys(wishList).length > 0) {
                item.flag = 1;
              } else {
                item.flag = 0;
              }
            }
            return res.ok(result, undefined, response.RESPONSE_STATUS.success);
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

  uploadFile: async (req, res) => {
    try {
      const isValidation = productIdValidation.uploadFileValidation.validate(
        req.body
      );
      if (!isValidation.error) {
        req
          .file("image")
          .upload({ dirname: envVariables.path }, async (err, uploadFile) => {
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

            let images ;
            if (uploadFile && uploadFile.length > 0) {
              images = uploadFile.map((item) => {
                let filename = item.fd.split("/").slice(-1)[0];
                return filename
              })
            }
              return res.ok(
                images,
                `Image ${messages.ADD_DATA}`,
                response.RESPONSE_STATUS.success
              );
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

  deleteProductImage: async (req, res) => {
    try {
      const isValidation = productIdValidation.idValidation.validate(req.params);
      if (!isValidation.error) {
        const deleteProductImage = await deleteOne('Product_Image', req.params);
        if (deleteProductImage && deleteProductImage.length > 0) {
          return res.ok(
            undefined,
            `Product Image ${messages.DELETE_SUCCESS}`,
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
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} delete banner.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};