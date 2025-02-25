/**
 * ProductsController.listProducts
 *
 * @description :: Fetch all products.
 */

module.exports = {
  friendlyName: 'List Products',
  description: 'Retrieve all available products from the database.',

  inputs: {}, // No inputs required for listing all products

  exits: {
    success: {
      statusCode: 200,
      description: 'Products retrieved successfully.',
    },
    serverError: {
      statusCode: 500,
      description: 'An unexpected error occurred while fetching products.',
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Fetch products from the database
      const products = await Product.find();

      // Return the products
      return exits.success(products);
    } catch (error) {
      sails.log.error('Error fetching products:', error);
      return exits.serverError({ error: 'An error occurred while fetching products' });
    }
  }
};
