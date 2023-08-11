/* eslint-disable camelcase */
const messages = require('../utils/constants/message');
const response = require('../utils/constants/enums');
const orderValidation = require('../validations/OrderValidation');
const idValidation = require('../validations/IdValidation');
const {
  findAll,
  deleteOne,
  updateOne,
  findPopulate,
  create,
  createEach,
  findOne
} = require('../services/serviceLayer');

module.exports = {
  checkOut: async (req, res) => {
    try {
      const { user_id, tax, product_id, quantity, address_id, shipping_id } = req.body;
      const isValidate = orderValidation.checkOut.validate(req.body);
      if (!isValidate.error) {
        const checkOut = await findPopulate('Cart', { user_id }, [
          'product_id',
        ]);

        let sum = 0;
        checkOut.map((item) => {
          item.totalAmount = item.quantity * item.product_id.price;
          sum += item.totalAmount;
        });

        let totalTax;
        if (tax) {
          totalTax = (sum / 100) * tax;
          sum += totalTax;          
        }

        let bill_id = shipping_id ? shipping_id : null;
        
        const values = {
          user_id,
          tax          : totalTax,
          total_amount : sum,
          address_id,
          shipping_id  : bill_id  
        };

        const orderData = await create('Order', values);
        let count = 0;

        const data = product_id.map((item) => {
          const returnData = {
            product_id: item,
            order_id: orderData.id,
            quantity: quantity[count],
          };
          count++;
          return returnData;
        });

        if (orderData && Object.keys(orderData).length > 0) {
          let createdRecords = await createEach('Order_Product', data);

          if (createdRecords && createdRecords.length > 0) {

            for (let item of checkOut) {
            await deleteOne('Cart', {id : item.id});
            await deleteOne('Prescription_Details', {cart_id : item.id});
            }

            values.id = orderData.id
            return res.ok(
              values,
              messages.PLACE_ORDER,
              response.RESPONSE_STATUS.success
            );
          } else {
            await deleteOne('Order', { id: orderData.id });
            return res.notFound(
              undefined,
              messages.ORDER_NOT_PLACED,
              response.RESPONSE_STATUS.error
            );
          }
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
        `${messages.REQUEST_FAILURE} checkOut`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  orderStatus: async (req, res) => {
    try {
      let { id, flag } = req.body;
      const isValidate = orderValidation.orderStatus.validate(req.body);
      if (!isValidate.error) {
        let order_status;
        switch (flag) {
          case 0:
            order_status = response.OrderEnum.Failed;
            break;
          case 1:
            order_status = response.OrderEnum.Success;
            break;
          case 3:
            order_status = response.OrderEnum.Confirmed;
            break;
          case 4:
            order_status = response.OrderEnum.Approve;
            break;
          case 5:
            order_status = response.OrderEnum.Processing;
            break;
          case 6:
            order_status = response.OrderEnum.Rejected;
            break;
          default:
            order_status = response.OrderEnum.Pending;
        }

        const updateStatus = await updateOne(
          'Order',
          { id },
          { status: order_status }
        );

        if (updateStatus && updateStatus.length > 0) {
          if (order_status === response.OrderEnum.Confirmed) {
            const result = await findAll('Order_Product', {
              order_id: id,
            });
            for (let item of result) {
              //If order is Confirmed then will product quantity reduce according the buy quantity of product.
              Order.query(
                "UPDATE product SET product.quantity = product.quantity - '" +
                  item.quantity +
                  "' WHERE product.id = '" +
                  item.product_id +
                  "'",
                (err, rawResult) => {
                  if (err) {
                    return res.serverError(
                      err,
                      messages.SOMETHING_WENT_WRONG,
                      response.RESPONSE_STATUS.error
                    );
                  }
                  if (rawResult.affectedRows === 1) {
                    return res.ok(
                      undefined,
                      messages.UPDATE_ORDER,
                      response.RESPONSE_STATUS.success
                    );
                  } else {
                    return res.notFound(
                      undefined,
                      messages.NOT_UPDATE_QUANTITY,
                      response.RESPONSE_STATUS.error
                    );
                  }
                }
              );
            }
          } else {
            return res.ok(
              undefined,
              messages.UPDATE_ORDER,
              response.RESPONSE_STATUS.success
            );
          }
        } else {
          return res.ok(
            undefined,
            messages.ID_NOT_FOUND,
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
        `${messages.REQUEST_FAILURE} order status.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  cancelOrder: async (req, res) => {
    try {
      const { id, flag } = req.body;
      const isValidate = orderValidation.orderCancel.validate(req.body);

      if (!isValidate.error) {
        const orderCancel = await updateOne(
          'Order',
          { id },
          { is_archived: flag }
        );

        //If order is_archived true then also delete data in Order_Product based on order_id.
        if (orderCancel && orderCancel.length > 0) {
          const deleteOrder = await deleteOne('Order_Product', {
            order_id: id,
          });

          if (deleteOrder && deleteOrder.length > 0) {
            return res.ok(
              undefined,
              `Order ${messages.DELETE_SUCCESS}`,
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
          return res.notFound(
            undefined,
            messages.CANCEL_ORDER,
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
        `${messages.REQUEST_FAILURE} cancel order.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  orderHistory: async (req, res) => {
    try {
      let isValidation = idValidation.userIdValidation.validate(req.params);
      if (!isValidation.error) {
        const orderHistory = await findAll(
          'Order',
          { user_id: req.params.user_id, is_archived:0 },
          ['id', 'user_id', 'created_at', 'status', 'total_amount' , 'is_archived']
        );

        if (orderHistory && orderHistory.length > 0) {
          return res.ok(
            orderHistory,
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
        `${messages.REQUEST_FAILURE} order history.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  viewOrder: async (req, res) => {
    try {
      const isValidation = idValidation.orderIdValidation.validate(req.params);
      if (!isValidation.error) {
        const viewData = await findPopulate(
          'Order_Product',
          { order_id: req.params.order_id },
          ['order_id', 'product_id']
        );
        if (viewData && viewData.length > 0) {
          let productDetails = [];
          for (let item of viewData) {
            let result = {
              name         : item.product_id.name,
              description  : item.product_id.description,
              price        : item.product_id.price,
              quantity     : item.quantity,
              metaTagTitle : item.product_id.metaTagTitle,
              total_amount : item.order_id.total_amount,
              status       : item.order_id.status
            };
            productDetails.push(result);
          }
          const userData = await findOne(
            'Users',
            { id: viewData[0].order_id.user_id },
            ['first_name', 'email_id', 'phone_no']
          );
          const addressData = await findOne(
            'Bill_Address',
            { id: viewData[0].order_id.address_id },
            [
              'address_line_1',
              'address_line_2',
              'city_id',
              'state_id',
              'country_id',
              'zip_code',
            ]
          );

          const shippingData = await findOne(
            'Bill_Address',
            { id: viewData[0].order_id.shipping_id },
            [
              'address_line_1',
              'address_line_2',
              'city_id',
              'state_id',
              'country_id',
              'zip_code',
            ]
          );

          if ((addressData && Object.keys(addressData).length > 0) || (shippingData &&  Object.keys(addressData).length > 0)) {
            const countryData = await findOne('Country', {
              id: addressData.country_id,
            });
            const stateData = await findOne('State', {
              id: addressData.state_id,
            });
            const cityData = await findOne('City', { id: addressData.city_id });

            addressData.country_id = countryData.country_name;
            addressData.state_id = stateData.state_name;
            addressData.city_id = cityData.city_name;

            shippingData.country_id = countryData.country_name;
            shippingData.state_id = stateData.state_name;
            shippingData.city_id = cityData.city_name;
          }
          
          const orderData = await findOne(
            'Order',
            { id: viewData[0].order_id.id },
            ['tax', 'total_amount', 'status']
          );
          
          let detailsOfOrder = {
            ...userData,
            ...addressData,
            ...orderData
          }

          const result = {detailsOfOrder, productDetails , shippingData };

          return res.ok(
            result,
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
        `${messages.REQUEST_FAILURE} view order.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
