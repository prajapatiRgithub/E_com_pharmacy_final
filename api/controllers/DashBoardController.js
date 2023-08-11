/* eslint-disable camelcase */
const messages = require('../utils/constants/message');
const response = require('../utils/constants/enums');
const { countOne, findAll } = require('../services/serviceLayer');
const { findPopulate } = require('../services/serviceLayer');

module.exports = {
  countOfData: async (req, res) => {
    try {
      const obj = {};

      const countOfCustomer = await countOne('Users');
      const activeCustomer = await countOne('Users', { is_archived: 0 });
      const activeCategories = await countOne('Category', { is_archived: 0 });
      const countOfProduct = await countOne('Product');
      const productWithOutPrescription = await countOne('Product', {
        is_prescription: 0,
      });
      const productWithPrescription = await countOne('Product', {
        is_prescription: 1,
      });
      const confirmedOrder = await countOne('Order', {
        status: response.OrderEnum.Confirmed,
      });
      const pendingOrder = await countOne('Order', {
        status: response.OrderEnum.Pending,
      });
      const totalOrder = await countOne('Order');
      const totalSales = await findAll(
        'Order',
        {
          status: 'Confirmed',
        },
        ['total_amount']
      );

      let totalAmount = 0;

      totalSales.map((item) => totalAmount += item.total_amount);

      obj.ActiveCustomer = activeCustomer;
      obj.Customer = countOfCustomer;
      obj.Category = activeCategories;
      obj.Product = countOfProduct;
      obj.withPrescription = productWithPrescription;
      obj.productWithOutPrescription = productWithOutPrescription;
      obj.TotalOrder = totalOrder;
      obj.ConfirmedOrder = confirmedOrder;
      obj.PendingOrder = pendingOrder;
      obj.TotalSales = totalAmount;

      return res.ok(
        obj,
        messages.GET_ALL_STATISTICS,
        response.RESPONSE_STATUS.success
      );
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} count of data.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  graphOfCustomer: async (req, res) => {
    try {
      Users.query(
        'SELECT COUNT(MONTH(created_at)) as count,(MONTH(created_at)) as month, YEAR(created_at) AS Year FROM users where  created_at > now() - INTERVAL 12 month GROUP BY MONTH(created_at)',
        function (err, rawResult) {
          if (err) {
            return res.serverError(err);
          }

          let monthName = Array.from(Array(13).keys()).slice(1);
          let date = new Date();
          date.setDate(1);
          const countData = [];
          for (let i = 0; i <= 11; i++) {
            countData.push({
              count: 0,
              month: monthName[date.getMonth()],
              Year: date.getFullYear(),
            });
            date.setMonth(date.getMonth() - 1);
          }

          const findMonth = rawResult.rows;
          countData.map((list) => {
            const found = findMonth.find(
              (element) => element.month === list.month
            );
            if (found) {
              list.count = found.count;
            }
          });

          if (countData && countData.length > 0) {
            return res.ok(
              countData,
              messages.GET_RECENT_USER,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.notFound(
              undefined,
              messages.DATA_NOT_FOUND,
              response.RESPONSE_STATUS.error
            );
          }
        }
      );
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} graph of customer.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  recentlyRegistration: async (req, res) => {
    try {
      const recentlyRegister = await findAll(
        'Users',
        undefined,
        undefined,
        'created_at DESC',
        10
      );

      return res.ok(
        recentlyRegister,
        messages.GET_RECENT_USER,
        response.RESPONSE_STATUS.success
      );
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} graph of customer.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  listOfOrder: async (req, res) => {
    try {
      const latestOrders = await findPopulate(
        'Order',
        undefined,
        ['user_id'],
        'created_at DESC'
      );

      const data = latestOrders.map((item) => {
        return {
          order_id     : item.id,
          userName     : item.user_id.first_name,
          lastName     : item.user_id.last_name,
          email        : item.user_id.email_id,
          total_amount : item.total_amount,
          status       : item.status,
          discount     : item.discount,
          tax          : item.tax
        };
      });

      return res.ok(data, messages.GET_ORDER, response.RESPONSE_STATUS.success);
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} list of order.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
