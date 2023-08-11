/* eslint-disable camelcase */
const cartValidation = require('../validations/CartValidation');
const cartIdValidation = require('../validations/IdValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const {
  create,
  updateOne,
  deleteOne,
  createEach,
  findPopulate,
  findAll,
  findOne
} = require('../services/serviceLayer');
const envVariables = require('../utils/constants/envVariables');
const vendorValidation = require('../validations/VendorValidation');
const { sendMail } = require('../services/nodemailer');

module.exports = {
  addToCart: async (req, res) => {
    try {
      const isValidation = cartValidation.addToCart.validate(req.body);
      if (!isValidation.error) {
        let { flag } = req.body;
        if (flag == 1 || flag == 2) {
          let data  = {
            product_id : req.body.product_id,
            user_id : req.body.user_id
          }
          const findData = await findOne('Cart', data);

          if (findData && Object.keys(findData).length > 0 ) {
            let quantity = findData.quantity + req.body.quantity;
            await updateOne('Cart', {id : findData.id}, {quantity});

            return res.ok(
              { id: findData.id },
              `Cart ${messages.ADD_DATA}`,
              response.RESPONSE_STATUS.success,
            );
          } else {
            const cartData = await create('Cart', req.body);
            if (cartData && Object.keys(cartData).length > 0) {
              return res.ok(
                { id: cartData.id },
                `Cart ${messages.ADD_DATA}`,
                response.RESPONSE_STATUS.success,
              );
            } else {
              return res.notFound(
                undefined,
                messages.DATA_NOT_FOUND,
                response.RESPONSE_STATUS.error,
              );
            }
          }
        } else {
          return res.notFound(
            undefined,
            messages.NOT_ADDED,
            response.RESPONSE_STATUS.error,
          );
        }
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} add cart.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },

  viewCart: async (req, res) => {
    try {
      const isValidation = cartIdValidation.userIdValidation.validate(
        req.params,
      );
      if (!isValidation.error) {
        let sql = `SELECT cart.user_id, cart.id, cart.quantity,product.id as product_id, product.is_prescription, product_image.image, product.price, product.description, product.name FROM cart INNER JOIN product ON cart.product_id = product.id INNER JOIN product_image ON product.id = product_image.product_id where is_Deleted = true AND cart.user_id = ${req.params.user_id} GROUP BY product_image.product_id`;

        Cart.query(sql, async (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.DATABASE_QUERY_ERROR,
              response.RESPONSE_STATUS.error,
            );
          }

          let total = [];
          let cartTransactionData = [];
          for (let item of rawResult.rows) {
            item.totalAmount = item.quantity * item.price;
            total.push(item.totalAmount);

            let prescriptionDetails = await findPopulate(
              'Prescription_Details',
              { cart_id: item.id },
              ['prescription_id'],
            );

            if (prescriptionDetails && prescriptionDetails.length > 0) {
              if (prescriptionDetails[0].prescription_id.status === 2) {
                item.flag = 2;
              }

              if (prescriptionDetails[0].prescription_id.status === 1) {
                item.flag = 1;
              }
            }
            cartTransactionData.push(item);
          }

          let subTotal = 0;
          total.forEach(CartSubTotal => {subTotal += CartSubTotal});

          const object = {
            product_id: cartTransactionData,
            subTotal: subTotal,
          };

          if (cartTransactionData && cartTransactionData.length > 0) {
            return res.ok(
              object,
              messages.CART_SUCCESS,
              response.RESPONSE_STATUS.success,
            );
          } else {
            return res.ok(
              undefined,
              messages.ID_NOT_FOUND,
              response.RESPONSE_STATUS.error,
            );
          }
        });
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} view cart.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },

  editCart: async (req, res) => {
    try {
      const idValidate = cartIdValidation.idValidation.validate(req.params);
      const isValidate = cartValidation.editCart.validate(req.body);
      if (!idValidate.error && !isValidate.error) {
        const cartData = await updateOne('Cart', req.params, req.body);
        if (cartData && cartData.length > 0) {
          return res.ok(
            undefined,
            messages.UPDATE_CART_SUCCESS,
            response.RESPONSE_STATUS.success,
          );
        } else {
          return res.ok(
            undefined,
            messages.ID_NOT_FOUND,
            response.RESPONSE_STATUS.error,
          );
        }
      } else {
        return res.badRequest(
          idValidate.error ? idValidate.error : isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} edit cart.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },

  deleteCart: async (req, res) => {
    try {
      const isValidation = cartIdValidation.idValidation.validate(req.params);
      if (!isValidation.error) {
        const data = await deleteOne('Cart', req.params)
        if (data && Object.keys(data).length > 0) {
          return res.ok(
            undefined,
            `Cart ${messages.DELETE_SUCCESS}`,
            response.RESPONSE_STATUS.success,
          );
        } else {
          return res.ok(
            undefined,
            messages.ID_NOT_FOUND,
            response.RESPONSE_STATUS.error,
          );
        }
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} delete cart.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },

  addPrescription: async (req, res) => {
    try {
      const isValidation = cartValidation.addPrescription.validate(req.body);

      if (!isValidation.error) {
        req
          .file('prescription')
          .upload({ dirname: envVariables.path }, async (err, uploadFile) => {
            if (err) {
              return res.serverError(
                err,
                messages.SOMETHING_WENT_WRONG,
                response.RESPONSE_STATUS.error,
              );
            }

            let { user_id, product_id, quantity, cart_id } = req.body;

            if (uploadFile && uploadFile.length === 0) {
              return res.badRequest(
                undefined,
                messages.IMAGE_VALIDATIONS,
                response.RESPONSE_STATUS.error,
              );
            }

            if (uploadFile && uploadFile.length > 0) {
              req.body.prescription = uploadFile[0].fd.split('/').slice(-1)[0];
            }

            let prescriptionData = await create('Prescription', { user_id });
            delete req.body.user_id;

            product_id = Array.isArray(product_id) ? product_id : [product_id];
            quantity = Array.isArray(quantity) ? quantity : [quantity];
            cart_id = Array.isArray(cart_id) ? cart_id : [cart_id];

            let count = 0;
            const data1 = product_id.map((item) => {
              const returnData = {
                cart_id: cart_id[count],
                product_id: item,
                prescription_id: prescriptionData.id,
                quantity: quantity[count],
                prescription: req.body.prescription,
              };
              count++;
              return returnData;
            });

            if (prescriptionData && Object.keys(prescriptionData).length > 0) {
              let error = null;
              let data = await createEach('Prescription_Details', data1).catch(
                (err) => {
                  error = err;
                },
              );

              if (error) {
                await deleteOne('Prescription', { id: prescriptionData.id });
                return res.serverError(
                  error,
                  `${messages.SOMETHING_WENT_WRONG}`,
                  response.RESPONSE_STATUS.error,
                );
              }

              if (data && data.length > 0) {
                return res.ok(
                  undefined,
                  `Prescription ${messages.ADD_DATA}`,
                  response.RESPONSE_STATUS.success,
                );
              } else {
                await deleteOne('Prescription', { id: prescriptionData.id });
                return res.ok(
                  undefined,
                  messages.DATA_NOT_FOUND,
                  response.RESPONSE_STATUS.success,
                );
              }
            } else {
              await deleteOne('Prescription', { id: prescriptionData.id });
              return res.ok(
                undefined,
                messages.NOT_ADDED_PRESCRIPTION,
                response.RESPONSE_STATUS.success,
              );
            }
          });
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} addPrescription.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },

  viewApprovalList: async (req, res) => {
    try {
      let listOfApproval = await findPopulate(
        'Prescription',
        undefined,
        ['user_id'],
        'id DESC',
      );

      if (listOfApproval && listOfApproval.length > 0) {
        let result = listOfApproval.map((item) => {
          return {
            id: item.id,
            status: item.status,
            created_at: item.created_at,
            first_name: item.user_id.first_name,
            last_name: item.user_id.last_name,
            email_id: item.user_id.email_id,
          };
        });
        return res.ok(
          result,
          messages.GET_SUCCESS,
          response.RESPONSE_STATUS.success,
        );
      } else {
        return res.ok(
          undefined,
          messages.DATA_NOT_FOUND,
          response.RESPONSE_STATUS.success,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} viewApprovalList.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },

  prescriptionApproval: async (req, res) => {
    try {
      const isValidate = vendorValidation.editVendor.validate(req.body);

      if (!isValidate.error) {
        let { id, status, reason } = req.body;
        const data = await updateOne('Prescription', { id }, { status });

        if (data && Object.keys(data).length > 0) {
          const findData = await findPopulate(
            'Prescription_Details',
            { prescription_id: id },
            ['prescription_id'],
          );

          const findUserData = await findPopulate('Prescription', { id }, [
            'user_id',
          ]);

          if (status === 1) {
            for (let item of findData) {
              let data = {
                user_id: item.prescription_id.user_id,
                quantity: item.quantity,
                product_id: item.product_id,
              };

              const data1 = await findAll('Cart', data);

              if (!data1) {
                await create('Cart', data);
              }
            }
            sendMail(findUserData[0].user_id.email_id);

            return res.ok(
              undefined,
              messages.PRESCRIPTION_APPROVAL,
              response.RESPONSE_STATUS.success,
            );
          }

          if (status === 0) {
            let finalStatus = false;
            sendMail(findUserData[0].user_id.email_id, undefined, reason);

            for (let item of findData) {
              await updateOne(
                'Cart',
                { id: item.cart_id },
                { is_Deleted: finalStatus },
              );
            }

            let deleteData = await deleteOne('Prescription_Details', {
              prescription_id: id,
            });

            if (deleteData) {
              await deleteOne('Prescription', { id });
            }
            return res.ok(
              undefined,
              messages.PRESCRIPTION_REJECTED,
              response.RESPONSE_STATUS.success,
            );
          }
        } else {
          return res.notFound(
            undefined,
            messages.DATA_NOT_FOUND,
            response.RESPONSE_STATUS.error,
          );
        }
      } else {
        return res.badRequest(
          isValidate.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} prescriptionApproval.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },

  detailsOfPrescription: async (req, res) => {
    try {
      const isValidation = cartIdValidation.idValidation.validate(req.params);

      if (!isValidation.error) {
        let sql = `SELECT prescription.id, users.first_name, product.name as productName, product.price, prescription_details.quantity, prescription_details.prescription FROM prescription_details INNER JOIN prescription ON prescription.id  = prescription_details.prescription_id INNER JOIN users ON users.id = prescription.user_id INNER JOIN product ON product.id = prescription_details.product_Id where prescription.id = '${req.params.id}'`;

        Prescription.query(sql, async (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.SOMETHING_WENT_WRONG,
              response.RESPONSE_STATUS.error,
            );
          }

          if (rawResult && rawResult.rows.length > 0) {
            return res.ok(
              rawResult.rows,
              undefined,
              response.RESPONSE_STATUS.success,
            );
          } else {
            return res.ok(
              undefined,
              messages.ID_NOT_FOUND,
              response.RESPONSE_STATUS.error,
            );
          }
        });
      } else {
        return res.badRequest(
          isValidation.error,
          undefined,
          response.RESPONSE_STATUS.error,
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} prescriptionApproval.`,
        response.RESPONSE_STATUS.error,
      );
    }
  },
};
