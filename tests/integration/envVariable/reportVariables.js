module.exports = {
  purchasedProductsData: {
    startDate: '2022-12-02 16:39:34',
    endDate: '2022-12-15 17:59:21',
    status: false,
    sort: {
      name: 'ASC',
    },
    limit: 2,
  },
  checkObjectValidation: {
    startDate: '2022-12-02 16:39:34',
    endDate: '2022-12-15 17:59:21',
    status: false,
    sort: [],
    limit: 2,
  },
  checkValidation: {
    startDate: '2022-12-02 16:39:34',
    endDate: '2022-12-15 17:59:21',
    status: false,
    sort: {
      name: 'ASC',
    },
    limit: 'abc',
  },
  checkDateValidation: {
    startDate: '2022-12-020000 16:39:34',
    endDate: '2022-12-15 17:59:21',
    status: false,
    sort: {
      name: 'ASC',
    },
    limit: 2,
  },
  dataNotPresent: {
    startDate: '2022-11-02 16:39:34',
    endDate: '2022-11-15 17:59:21',
    status: false,
    sort: {
      name: 'ASC',
    },
    limit: 2,
  },
  wrongPurchasedProductsData: {
    startDate: '2022-12-02 16:39:34',
    endDate: '2022-12-15 17:59:21',
    status: false,
    sort: {
      ram: 'ASC',
    },
    limit: 2,
  },
  purchasedProductsReportStartDateNull: {
    startDate: null,
    endDate: '2022-12-15 17:59:21',
    status: false,
    sort: {
      name: 'ASC',
    },
    limit: 2,
  },
  purchasedProductsReportEndDateNull: {
    startDate: '2022-12-02 16:39:34',
    endDate: null,
    status: false,
    sort: {
      name: 'ASC',
    },
    limit: 2,
  },
  passPurchasedProductsReportDateNull: {
    startDate: null,
    endDate: null,
    status: false,
    sort: {
      name: 'ASC',
    },
    limit: 2,
  },
  purchasedProductsReportNotPassLimit: {
    startDate: '2022-12-02 16:39:34',
    endDate: '2022-12-15 17:59:21',
    status: false,
    sort: {
      name: 'ASC',
    },
  },
  // vendor report variables
  vendorReportData: {
    startDate: '2022-11-11 23:10:46',
    endDate: '2022-12-24 13:59:10',
    status: 'true',
    sort: {
      first_name: 'ASC',
    },
    limit: 1,
  },
  checkVendorReportValidation: {
    startDate: '2022-11-11 23:10:46',
    endDate: '2022-12-24 13:59:10',
    status: false,
    sort: {
      first_name: 'ASC',
    },
    limit: 'abc',
  },
  checkVendorReportObjectValidation: {
    startDate: '2022-11-11 23:10:46',
    endDate: '2022-12-24 13:59:10',
    status: false,
    sort: [],
    limit: 2,
  },
  checkVendorReportDateValidation: {
    startDate: '2022-11-110000 23:10:46',
    endDate: '2022-12-24 13:59:10',
    status: false,
    sort: {
      first_name: 'ASC',
    },
    limit: 2,
  },
  wrongVendorReportData: {
    startDate: '2022-12-02 16:39:34',
    endDate: '2022-12-18 18:15:21',
    status: false,
    sort: {
      ram: 'ASC',
    },
    limit: 2,
  },
  vendorReportDataNotPresent: {
    startDate: '2022-12-28 04:30:12',
    endDate: '2022-12-28 14:29:15',
    status: 'true',
    sort: {
      first_name: 'ASC',
    },
    limit: 1,
  },
  checkCustomerValidation: {
    startDate: '2022-11-110000 23:10:46'
  },  
  sortValidation: {
    startDate : '2022-11-25 11:32:15',
    endDate   : '2022-12-26 11:32:15',
    sort      : 'dfsdgfd'
  },
  nameValidation: {
    customerName : 123
  },
  validCustomerTransaction: {
    startDate    : "2022-11-25 11:32:15",
    endDate      : "2022-12-26 11:32:15",
    customerName : "User",
    sort:{
        first_name: "ASC",
        email_id:"ASC"
    }
  },
  startDateDetails : {
    startDate    : "2022-05-01 11:32:15",
  },
  endDateDetails : {
    endDate    : "2023-01-30 11:32:15",
  },
  invalidCustomerTransaction: {
    startDate    : "2023-11-27 11:32:15",
    endDate      : "2023-11-27 11:32:15",
  },
  validCustomer: {
    startDate : "2022-11-25",
    endDate   : "2022-11-29",
    field     : "email_id",
    sort      : "ASC",
    limit     : 3
  },
  stringSortValidation: {
    sort : 123
  },
  nullValidation : {
    startDate : null,
    endDate   : null
  },
  limitValidation : {
    limit : 1
  },
  validCustomerOrderData: {
    startDate: "2022-01-29",
    endDate: "2023-12-29",
    customerName:"User",
    sort: {
          "email_id": "ASC"
    }
  },
  vendorReportStartDateNull: {
    startDate: null,
    endDate: '2022-12-24 13:59:10',
    status: 'true',
    sort: {
      first_name: 'ASC',
    },
    limit: 1,
  },
  vendorReportEndDateNull: {
    startDate: '2022-11-11 23:10:46',
    endDate: null,
    status: 'true',
    sort: {
      first_name: 'ASC',
    },
    limit: 1,
  },
  passVendorReportDateNull: {
    startDate: null,
    endDate: null,
    status: 'true',
    sort: {
      first_name: 'ASC',
    },
    limit: 1,
  },
  vendorReportNotPassLimit: {},
  // sales report variable
  salesData: {
    startDate: '2022-09-01',
    endDate: '2022-12-29',
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 1,
  },
  checkSalesReportObjectValidation: {
    startDate: '2022-09-01',
    endDate: '2022-12-29',
    sort: [],
    limit: 1,
  },
  checkSalesReportValidation: {
    startDate: '2022-09-01',
    endDate: '2022-12-29',
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 'abc',
  },
  checkSalesDateValidation: {
    startDate: '2022-09-010000',
    endDate: '2022-12-29',
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 1,
  },
  wrongSalesData: {
    startDate: '2022-09-01',
    endDate: '2022-12-29',
    sort: {
      demo: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 1,
  },
  salesReportDataNotPresent: {
    startDate: '2011-01-01',
    endDate: '2011-04-29',
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 1,
  },
  salesReportStartDateNull: {
    startDate: null,
    endDate: '2022-12-29',
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 1,
  },
  salesReportEndDateNull: {
    startDate: '2022-09-01',
    endDate: null,
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 1,
  },
  passSalesReportDateNull: {
    startDate: null,
    endDate: null,
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
    limit: 1,
  },
  salesReportNotPassLimit: {
    startDate: '2022-09-01',
    endDate: '2022-12-29',
    sort: {
      total_amount: 'ASC',
      noOfOrder: 'ASC',
    },
  },
};