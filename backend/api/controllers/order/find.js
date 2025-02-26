/**
 * OrderController.findOrder
 *
 * @description :: Find an order by its ID.
 */

module.exports = {
  friendlyName: 'Find Order Details',
  description: 'Retrieve an order details by its ID.',

  inputs: {
    id: {
      type: 'number',
      required: true,
      description: 'The ID of the order to retrieve.',
    }
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Order found successfully.',
    },
    notFound: {
      statusCode: 404,
      description: 'No order found with the provided ID.',
    },
    serverError: {
      statusCode: 500,
      description: 'An unexpected error occurred.',
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Find the order by ID
      const order = await OrderDetails.find({ orderId: inputs.id });

      if (!order) {
        return exits.notFound({ error: 'Order not found' });
      }

      // find the order products
      for(let i = 0; i < order.length; i++) {
        const product = await Product.findOne({ id: order[i].productId });

        if (!product) {
          return exits.notFound({ error: 'Product of order not found' });
        }

        // Remove the product ID from the order
        delete order[i].id;
        delete order[i].productId;
        delete product.stock;
        order[i].product = product;
      }

      return exits.success(order);
    } catch (error) {
      sails.log.error('Error retrieving order:', error);
      return exits.serverError({ error: 'An error occurred while retrieving the order' });
    }
  }
};
