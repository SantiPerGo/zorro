/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: async function (req, res) {
    try {
      // Fetch products from the database
      const products = await Product.find(); // Assuming you have a Product model

      // Return the products in the response
      return res.json(products);
    } catch (error) {
      // Handle any errors that occur during the database query
      sails.log.error('Error fetching products:', error);
      return res.serverError('An error occurred while fetching products');
    }
  },
};
