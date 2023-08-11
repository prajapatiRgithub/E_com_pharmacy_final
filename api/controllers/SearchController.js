const searchValidation = require('../validations/SearchValidation');
const response = require('../utils/constants/enums');
const messages = require('../utils/constants/message');
const { create, deleteOne, findAll } = require('../services/serviceLayer');

module.exports = {
  recentlySearch: async (req, res) => {
    try {
      const recentData = await findAll(
        'Search_History',
        undefined,
        undefined,
        'created_at desc'
      );
      if (recentData && recentData.length > 0) {
        return res.ok(
          recentData,
          messages.GET_SEARCH,
          response.RESPONSE_STATUS.success
        );
      } else {
        return res.notFound(
          messages.DATA_NOT_FOUND,
          response.RESPONSE_STATUS.error
        );
      }
    } catch (err) {
      return res.serverError(
        err,
        `${messages.REQUEST_FAILURE} recently search.`,
        response.RESPONSE_STATUS.error
      );
    }
  },

  addSearch: async (req, res) => {
    try {
      const isValidation = searchValidation.addSearch.validate(req.body);

      let {user_id, message, productName} = req.body;
      let data = {user_id, message};
      if (!isValidation.error) {
        const searchData = await findAll(
          'Search_History',
          undefined
        );

        //When i go to insert the 11th entry into the database the first entry should be deleted and only 10 entries should appear in the database.
        if (searchData && searchData.length >= 10) {
          await deleteOne('Search_History', { id: searchData[0].id });
        }
        let searchDetails = await create('Search_History', data);

        if (searchDetails && Object.keys(searchDetails).length > 0) {
          let search = {};
          search.name = productName;
          let productDetails = await findAll('Product',search);

          if (productDetails && productDetails.length > 0) {
            return res.ok(
              productDetails,
              undefined,
              response.RESPONSE_STATUS.success
            );
          } else {
            return res.ok(
              productDetails,
              `Your search - ${productName}... - did not match any product. `,
              response.RESPONSE_STATUS.success
            );
          }
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
        `${messages.REQUEST_FAILURE} add search.`,
        response.RESPONSE_STATUS.error
      );
    }
  },
};
