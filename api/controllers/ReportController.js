const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const { customerTransaction, customer, validator, sale, customerOrder } = require('../validations/ReportValidation');
const {findAll, reportService} = require('../services/serviceLayer');

module.exports = {
  purchasedProducts: async (req, res) => {
    try {
      let isValidate = validator.validate(req.body);
      if (!isValidate.error) {
        let sql =
          "SELECT op.quantity, op.created_at, p.name, p.price, p.is_prescription FROM order_product op INNER JOIN product p ON op.product_id = p.id WHERE 1";

          const updatedSql = await reportService(
            sql,
            'op.created_at',
            'is_prescription',
            req.body
          ); 

        Order_Product.query(updatedSql, (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.DATABASE_QUERY_ERROR,
              response.RESPONSE_STATUS.error
            );
          }

          let total = [];
          const transactionData = rawResult.rows.map((item) => {
            item.totalAmount = item.quantity * item.price;
            total.push(item.totalAmount);
            return {
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total: item.totalAmount,
            };
          });

          let subTotal = 0;
          total.map(productSubTotal => subTotal += productSubTotal);

          const object = {
            product: transactionData,
            subTotal: subTotal,
          };

          if (transactionData && transactionData.length > 0) {
            return res.ok(
              object,
              messages.GET_LIST_DATA,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.ok(
              [],
              messages.NOT_FOUND,
              response.RESPONSE_STATUS.success
            );
          }
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
        `${messages.REQUEST_FAILURE} purchased products.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
  
  vendorReport: async (req, res) => {
    try {
      let isValidate = validator.validate(req.body);
      if (!isValidate.error) {
        let sql =
          "SELECT op.quantity, p.price, p.description, p.is_prescription, op.created_at, v.first_name, v.address FROM order_product op INNER JOIN product p ON op.product_id = p.id INNER JOIN vendor v ON p.vendor_id = v.id WHERE 1";
      
        const updatedSql = await reportService(
          sql,
          'op.created_at',
          'is_prescription',
          req.body
        ); 

        Order_Product.query(updatedSql, (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.DATABASE_QUERY_ERROR,
              response.RESPONSE_STATUS.error
            );
          }

          let total = [];
          const transactionData = rawResult.rows.map((item) => {
            item.totalAmount = item.quantity * item.price;
            total.push(item.totalAmount);
            return {
              first_name: item.first_name,
              total: item.totalAmount,
            };
          });

          let subTotal = 0;
          total.map(productSubTotal => subTotal += productSubTotal);

          const object = {
            vendor: transactionData,
            subTotal: subTotal,
          };

          if (transactionData && transactionData.length > 0) {
            return res.ok(
              object,
              messages.GET_LIST_DATA,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.ok(
              [],
              messages.NOT_FOUND,
              response.RESPONSE_STATUS.success
            );
          }
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
        `${messages.REQUEST_FAILURE} vendor report.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  customerTransaction: async (req, res) => {
    try {
      let isValidate = customerTransaction.validate(req.body);
      if (!isValidate.error) {
        let sql =
          "SELECT users.first_name, users.email_id, `order`.`total_amount`, payment.payment_status, users.created_at FROM payment INNER JOIN `order` ON `order`.`id` = payment.order_id INNER JOIN users ON `order`.`user_id` = users.id where 1";

        const updatedSql = await reportService(
          sql,
          "users.created_at",
          undefined,
          req.body,
          "users.first_name"
        );

        Users.query(updatedSql, (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.DATABASE_QUERY_ERROR,
              response.RESPONSE_STATUS.error
            );
          }

          const CustomerTransactionData = rawResult.rows.map((item) => {
            let status;
            switch (item.payment_status) {
              case 0:
                status = response.ReportEnum.failed;
                break;
              case 1:
                status = response.ReportEnum.success;
                break;
              default:
                status = response.ReportEnum.pending;
                break;
            }

            return {
              customerName : item.first_name,
              Email        : item.email_id,
              totalAmount  : item.total_amount,
              status,
              date         : item.created_at,
            };
          });

          if (CustomerTransactionData && CustomerTransactionData.length > 0) {
            return res.ok(
              CustomerTransactionData,
              messages.GET_LIST_DATA,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.ok(
              [],
              messages.NOT_FOUND,
              response.RESPONSE_STATUS.success
            );
          }
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
        `${messages.REQUEST_FAILURE} customer transaction report.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  customer: async (req, res) => {
    try {
      const { startDate, endDate, status, field, sort, limit } = req.body;
      let isValidation = customer.validate(req.body);

      if (!isValidation.error) {
        let search = {};

        if (startDate) {
          search.created_at = { ">=": startDate };
        }

        if (endDate) {
          search.created_at = { "<=": endDate };
        }

        let is_archived;
        if (status === response.ReportEnum.active) {
          is_archived = 1;
        }
        if (status === response.ReportEnum.deActive) {
          is_archived = 0;
        }

        search.is_archived = is_archived;
        let data;

        if (field && sort) {
          data = `${field} ${sort}`;
        }

        const customerData = await findAll(
          "Users",
          search,
          ["first_name", "email_id", "phone_no", "is_archived", "created_at"],
          data,
          limit
        );

        if (customerData && customerData.length > 0) {
          return res.ok(
            customerData,
            messages.GET_LIST_DATA,
            response.RESPONSE_STATUS.success
          );
        } else {
          return res.ok(
            [],
            messages.NOT_FOUND,
            response.RESPONSE_STATUS.success
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
        `${messages.REQUEST_FAILURE} customer report.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  customerOrder: async (req, res) => {
    try {
      let isValidate = customerOrder.validate(req.body);
      if (!isValidate.error) {
        let sql =
          "SELECT COUNT(DISTINCT order_product.order_id) as noOfOrder, `order`.`is_archived`, `order`.`status`, order_product.order_id, users.email_id, users.is_archived, users.first_name, product.price, SUM(order_product.quantity) as noOfProd, SUM(order_product.quantity) * product.price as totalAmount FROM order_product INNER JOIN `order` ON `order`.`id` = order_product.order_id INNER JOIN product ON product.id = order_product.product_id INNER JOIN users ON users.id = `order`.`user_id` where 1";

        let updatedSql = await reportService(
          sql,
          "users.created_at",
          undefined,
          req.body,
          "users.first_name",
          "`order`.`status`",
          " GROUP BY `order`.`user_id`"
        );

        Users.query(updatedSql, (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.DATABASE_QUERY_ERROR,
              response.RESPONSE_STATUS.error
            );
          }

          const customerOrderData = rawResult.rows.map((item) => {
            let status;

            switch (item.is_archived) {
              case 1:
                status = response.ReportEnum.active;
                break;
              default:
                status = response.ReportEnum.deActive;
                break;
            }

            return {
              customerName : item.first_name,
              email        : item.email_id,
              noOfOrder    : item.noOfOrder,
              noOfProduct  : item.noOfProd,
              status,
              price        : item.price,
              order        : item.order_id,
              total        : item.totalAmount,
            };
          });

          if (customerOrderData && customerOrderData.length > 0) {
            return res.ok(
              customerOrderData,
              messages.GET_LIST_DATA,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.ok(
              [],
              messages.NOT_FOUND,
              response.RESPONSE_STATUS.success
            );
          }
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
        `${messages.REQUEST_FAILURE} customer order report.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  saleReport: async (req, res) => {
    try {
      let isValidate = sale.validate(req.body);
      if (!isValidate.error) {
        let sql =
          "SELECT COUNT(DISTINCT order_product.order_id) as noOfOrder,product.price, SUM(order_product.quantity) as noOfProd,`order`.`tax`, SUM(order_product.quantity) * product.price as totalAmount FROM order_product INNER JOIN `order` ON `order`.`id` = order_product.order_id INNER JOIN product ON product.id = order_product.product_id where 1";
  
        let updatedSql = await reportService(
          sql,
          "`order`.`created_at`",
          undefined,
          req.body,
          undefined,
          undefined,
          " GROUP BY `order`.`user_id`"
        );  

        Users.query(updatedSql, (err, rawResult) => {
          if (err) {
            return res.serverError(
              err,
              messages.DATABASE_QUERY_ERROR,
              response.RESPONSE_STATUS.error
            );
          }
  
          const salesData = rawResult.rows.map((item) => {
            return {
              noOfOrder   : item.noOfOrder,
              noOfProduct : item.noOfProd,
              tax         : item.tax,
              total       : item.totalAmount,
            };
          });
  
          if (salesData && salesData.length > 0) {
            return res.ok(
              salesData,
              messages.GET_LIST_DATA,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.ok([], messages.NOT_FOUND, response.RESPONSE_STATUS.error);
          }
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
        `${messages.REQUEST_FAILURE} sale report.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
