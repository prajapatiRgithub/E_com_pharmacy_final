/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

 module.exports.routes = {

  /***************************************************************************
                                                                            
   Make the view located at `views/homepage.ejs` your home page.            
                                                                            
   (Alternatively, remove this and add an `index.html` file in your         
   `assets` directory)                                                      
                                                                            
  ***************************************************************************/
  //user module
  'POST /api/user/registration'                        : 'UserController.signup',
  'POST /api/admin/login'                              : 'UserController.login',
  'POST /api/user/login'                               : 'UserController.login',
  'POST /api/user/verifyEmail'                         : 'UserController.verifyEmail',
  'POST /api/user/verifyOtp'                           : 'UserController.verifyOtp',
  'PUT /api/user/updatePassword'                       : 'UserController.updatePassword', 
  'PUT /api/user/editProfile/:id'                      : 'UserController.editProfile',
  'GET /api/user/viewProfile/:id/:role'                : 'UserController.viewProfile',
  'POST /api/user/city'                                : 'AddressController.address',
  'POST /api/user/state'                               : 'AddressController.address',
  'POST /api/user/country'                             : 'AddressController.address',
  'PUT /api/user/resetPassword/:id'                    : 'UserController.resetPassword',
  //vendor module
  'POST /api/vendor/registration'                      : 'UserController.signup',  
  'POST /api/vendor/login'                             : 'UserController.login',
  'POST /api/vendor/verifyEmail'                       : 'UserController.verifyEmail',
  'POST /api/vendor/verifyOtp'                         : 'UserController.verifyOtp',
  'PUT /api/vendor/updatePassword'                     : 'UserController.updatePassword',
  'PUT /api/vendor/editProfile/:id'                    : 'UserController.editProfile',
  'GET /api/vendor/viewProfile/:id/:role'              : 'UserController.viewProfile',
  'PUT /api/vendor/resetPassword/:id'                  : 'UserController.resetPassword',
  'GET /api/vendor/listOfVendor'                       : 'VendorController.vendorList',
  'PUT /api/admin/vendorApproval'                      : 'VendorController.vendorApproval',
  'GET /api/vendor/orderList'                          : 'VendorController.orderList',
  'GET /api/vendor/vendorPendingList'                  : 'VendorController.vendorPendingList',
  'GET /api/vendor/orderInvoice/:order_id'             : 'VendorController.orderInvoice',
  //DashBoard
  'GET /api/admin/dashBoard/countOfData'               : 'DashBoardController.countOfData',
  'GET /api/admin/dashBoard/graphOfCustomer'           : 'DashBoardController.graphOfCustomer',
  'GET /api/admin/dashBoard/recentlyRegistration'      : 'DashBoardController.recentlyRegistration',
  'GET /api/admin/dashBoard/listOfOrder'               : 'DashBoardController.listOfOrder',
  //banner
  'POST /api/banner/listOfBanner'                      : 'AddressController.address',
  'POST /api/banner/addBanner'                         : 'BannerController.addBanner',
  'PUT /api/banner/editBanner/:id'                     : 'BannerController.editBanner',
  'DELETE /api/banner/deleteBanner/:id'                : 'BannerController.deleteBanner',
  //category
  'POST /api/category/addCategory'                     : 'CategoryController.addCategory',
  'POST /api/category/listOfCategory'                  : 'CommonController.listData',
  'PUT /api/category/editCategory/:id'                 : 'CategoryController.editCategory',
  'PUT /api/category/deleteCategory/:id'               : 'CategoryController.deleteCategory',
  'PUT /api/category/deleteMultipleCategory'           : 'CategoryController.deleteMultipleCategory',
  //Product
  'POST /api/product/addProduct'                       : 'ProductController.addProduct',
  'PUT /api/product/editProduct/:product_id'           : 'ProductController.editProduct',
  'PUT /api/product/deleteProduct/:id'                 : 'ProductController.deleteProduct',
  'POST /api/vendor/productImage'                      : 'ProductController.uploadFile',
  'GET /api/product/viewProduct/:product_id'           : 'ProductController.viewProduct',
  'POST /api/product/listOfProducts'                   : 'ProductController.listOfProducts',
  'PUT /api/product/deleteMultipleProduct'             : 'ProductController.deleteMultipleProduct',
  'POST /api/product/searchProduct'                    : 'ProductController.searchProduct',
  'DELETE /api/product/deleteProductImage/:id'         : 'ProductController.deleteProductImage',
  'POST /api/product/productViewCount'                 : 'ProductController.productCount',
  'GET /api/product/mostFrequentlyProducts'            : 'ProductController.mostFrequentlyProducts',
  //Search
  'GET /api/search/recentlySearch'                     : 'SearchController.recentlySearch',
  'POST /api/search/addSearch'                         : 'SearchController.addSearch',
  //Cart
  'POST /api/cart/addToCart'                           : 'CartController.addToCart',
  'GET /api/cart/viewCart/:user_id'                    : 'CartController.viewCart',
  'PUT /api/cart/editCart/:id'                         : 'CartController.editCart',
  'Delete /api/cart/deleteCart/:id'                    : 'CartController.deleteCart',
  'POST /api/cart/addPrescription'                     : 'CartController.addPrescription',
  'PUT /api/admin/prescriptionApproval'                : 'CartController.prescriptionApproval',
  'GET /api/admin/listOfApprovals'                     : 'CartController.viewApprovalList',
  'GET /api/admin/detailsOfPrescription/:id'           : 'CartController.detailsOfPrescription',
  //Wishlist
  'POST /api/wishlist/addWishlist'                     : 'WishListController.addWishlist',
  'GET  /api/wishlist/viewWishlist/:user_id'           : 'WishListController.viewWishlist',
  'DELETE /api/wishlist/deleteWishlist/:id'            : 'WishListController.deleteWishlist',
  //BillAddress
  'POST /api/billAddress/addAddress'                   : 'BillAddressController.addAddress',
  'POST /api/billAddress/viewAddress'                  : 'BillAddressController.viewAddress',
  'DELETE /api/billAddress/deleteAddress/:id'          : 'BillAddressController.deleteAddress',
  'PUT /api/billAddress/editAddress/:id'               : 'BillAddressController.editAddress',
  //payment
  'POST /api/payment/addPayment'                       : 'PaymentController.addPayment',
  'GET /api/payment/historyOfPayment/:order_id'        : 'PaymentController.historyOfPayment',
  //Coupon
  'POST /api/coupon/addCouponCode'                     : 'CouponController.addCouponCode',
  'GET /api/coupon/listOfCoupon'                       : 'CouponController.listOfCoupon',
  //Report
  'POST /api/admin/purchasedProducts'                  : 'ReportController.purchasedProducts',
  'POST /api/admin/vendorReport'                       : 'ReportController.vendorReport',
  'POST /api/admin/customerTransactionReport'          : 'ReportController.customerTransaction',
  'POST /api/admin/customerReport'                     : 'ReportController.customer',
  'POST /api/admin/customerOrderReport'                : 'ReportController.customerOrder',
  'POST /api/admin/salesReport'                        : 'ReportController.saleReport',
  //Order
  'POST /api/order/checkout'                           : 'OrderController.checkOut',
  'PUT /api/order/cancelOrder'                         : 'OrderController.cancelOrder',
  'GET /api/order/orderHistory/:user_id'               : 'OrderController.orderHistory',
  'PUT /api/order/orderStatus'                         : 'OrderController.orderStatus',
  'GET /api/order/viewOrder/:order_id'                 : 'OrderController.viewOrder',
  'POST /api/order/listOfOrder'                        : 'OrderController.listOfOrder'

  /***************************************************************************
                                                                            
   More custom routes here...                                               
   (See https://sailsjs.com/config/routes for examples.)                    
                                                                            
   If a request to a URL doesn't match any of the routes in this file, it   
   is matched against "shadow routes" (e.g. blueprint routes).  If it does  
   not match any of those, it is matched against static assets.             
                                                                            
  ***************************************************************************/


};
