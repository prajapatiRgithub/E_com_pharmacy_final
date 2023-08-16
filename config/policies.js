/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  //adminAdministrator for admin module only.
  //vendorAdministrator for vendor module only.
  //usersAdministrator for user module only.
  //commonAdministrator for admin, vendor, user.

  BannerController: {
    addBanner    : ['isLoggedIn', 'commonAdministrator'],
    editBanner   : ['isLoggedIn', 'commonAdministrator'],
    deleteBanner : ['isLoggedIn', 'commonAdministrator'],
  },

  BillAddressController: {
    addAddress    : ['isLoggedIn', 'usersAdministrator'],
    viewAddress   : ['isLoggedIn', 'usersAdministrator'],
    editAddress   : ['isLoggedIn', 'usersAdministrator'],
    deleteAddress : ['isLoggedIn', 'usersAdministrator'],
  },

  CartController: {
    addToCart             : ['isLoggedIn', 'usersAdministrator'],
    viewCart              : ['isLoggedIn', 'usersAdministrator'],
    editCart              : ['isLoggedIn', 'usersAdministrator'],
    deleteCart            : ['isLoggedIn', 'usersAdministrator'],
    addPrescription       : ['isLoggedIn', 'commonAdministrator'],
    prescriptionApproval  : ['isLoggedIn', 'commonAdministrator'],
    viewApprovalList      : ['isLoggedIn', 'commonAdministrator'],
    detailsOfPrescription : ['isLoggedIn', 'commonAdministrator']
  },

  CategoryController: {
    addCategory    : ['isLoggedIn', 'commonAdministrator'],
    editCategory   : ['isLoggedIn', 'commonAdministrator'],
    deleteCategory : ['isLoggedIn', 'commonAdministrator'],
  },

  CommonController: {
    listData : ['isLoggedIn', 'commonAdministrator'],
  },

  DashBoardController: {
    countOfData          : ['isLoggedIn', 'commonAdministrator'],
    graphOfCustomer      : ['isLoggedIn', 'commonAdministrator'],
    recentlyRegistration : ['isLoggedIn', 'commonAdministrator'],
    listOfOrder          : ['isLoggedIn', 'commonAdministrator'],
  },

  ProductController: {
    addProduct     : ['isLoggedIn', 'commonAdministrator'],
    editProduct    : ['isLoggedIn', 'commonAdministrator'],
    deleteProduct  : ['isLoggedIn', 'commonAdministrator'],
    productImage   : ['isLoggedIn', 'commonAdministrator'],
    searchProduct  : ['isLoggedIn', 'commonAdministrator']
  },

  SearchController: {
    recentlySearch : ['isLoggedIn', 'commonAdministrator'],
  },

  UserController: {
    editProfile   : ['isLoggedIn', 'commonAdministrator'],
    viewProfile   : ['isLoggedIn', 'commonAdministrator'],
    resetPassword : ['isLoggedIn', 'commonAdministrator'],
  },

  VendorController: {
    vendorApproval    : ['isLoggedIn', 'commonAdministrator'],
    vendorList        : ['isLoggedIn', 'commonAdministrator'],
    orderList         : ['isLoggedIn', 'commonAdministrator'],
    vendorPendingList : ['isLoggedIn', 'commonAdministrator'],
    orderInvoice      : ['isLoggedIn', 'commonAdministrator'],
  },

  WishListController: {
    addWishlist    : ['isLoggedIn', 'usersAdministrator'],
    viewWishlist   : ['isLoggedIn', 'usersAdministrator'],
    deleteWishlist : ['isLoggedIn', 'usersAdministrator'],
  },

  PaymentController: {
    historyOfPayment : ['isLoggedIn', 'usersAdministrator'],
    addPayment       : ['isLoggedIn', 'usersAdministrator'],
  },

  CouponController: {
    addCouponCode : ['isLoggedIn', 'usersAdministrator'],
    listOfCoupon  : ['isLoggedIn', 'usersAdministrator'],
  },

  ReportController: {
    purchasedProducts   : ['isLoggedIn', 'commonAdministrator'],
    vendorReport        : ['isLoggedIn', 'commonAdministrator'],
    customerTransaction : ['isLoggedIn', 'commonAdministrator'],
    customer            : ['isLoggedIn', 'commonAdministrator'],
    customerOrder       : ['isLoggedIn', 'commonAdministrator'],
    saleReport          : ['isLoggedIn', 'commonAdministrator'],
  },

  OrderController: {
    checkOut     : ['isLoggedIn', 'usersAdministrator'],
    cancelOrder  : ['isLoggedIn', 'usersAdministrator'],
    orderHistory : ['isLoggedIn', 'commonAdministrator'],
    orderStatus  : ['isLoggedIn', 'usersAdministrator'],
    viewOrder    : ['isLoggedIn', 'commonAdministrator'],
  }
};
