/* eslint-disable camelcase */
const wishListValidation = require('../validations/WishListValidation');
const wishListIdValidation = require('../validations/IdValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const { create, deleteOne, findOne } = require('../services/serviceLayer');

module.exports = {
  addWishlist: async (req, res) => {
    try {
      const isValidate = wishListValidation.wishList.validate(req.body);
      if (!isValidate.error) {
        const alreadyAdded = await findOne('Wishlist', {and:[{ product_id: req.body.product_id, user_id: req.body.user_id}]});
        
        if (alreadyAdded === undefined) {
          const addData = await create('Wishlist', req.body);
          if (addData && Object.keys(addData).length > 0) {
            return res.ok(
              {id: addData.id},
              `Wishlist ${messages.ADD_DATA}`,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.notFound(
              undefined,
              messages.WISHLIST_FAILED,
              response.RESPONSE_STATUS.error
            );
          }
        } else {
          return res.ok(
            undefined,
            messages.ALREADY_EXIST,
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
        `${messages.REQUEST_FAILURE} added wishList.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  viewWishlist: async (req, res) => {
    try {
      const isValidation = wishListIdValidation.userIdValidation.validate(
        req.params
      );
      if (!isValidation.error) {
        let sql = `SELECT w.is_archived, w.id ,p.id as product_id, p.is_prescription, p.name, p.price, p.description, pi.image FROM wishlist w INNER JOIN product p ON w.product_id = p.id INNER JOIN product_image pi ON p.id = pi.product_id WHERE w.user_id = ${req.params.user_id} GROUP BY pi.product_id`;

        Wishlist.query(sql, (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.DATABASE_QUERY_ERROR,
              response.RESPONSE_STATUS.error
            );
          }

          const wishListTransactionData = rawResult.rows.map((item) => {
            return {
              id           : item.id,
              product_id   : item.product_id,
              name         : item.name,
              price        : item.price,
              description  : item.description,
              image        : item.image,
              isArchived   : item.is_archived,
              prescription : item.is_prescription
            };
          });

          if (wishListTransactionData && wishListTransactionData.length > 0) {
            return res.ok(
              wishListTransactionData,
              messages.VIEW_WISHLIST,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.ok(
              undefined,
              messages.ID_NOT_FOUND,
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
        `${messages.REQUEST_FAILURE} view wishList.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  deleteWishlist: async (req, res) => {
    try {
      const isValidation = wishListIdValidation.idValidation.validate(
        req.params
      );
      if (!isValidation.error) {
        const data = await deleteOne('Wishlist', req.params);

        if (data && data.length > 0) {
          return res.ok(
            undefined,
            `Wishlist ${messages.DELETE_SUCCESS}`,
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
        `${messages.REQUEST_FAILURE} delete wishlist.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
