/**
 * OrderController.findOrder
 *
 * @description :: Find an order by its ID.
 */

module.exports = {
  friendlyName: 'Find Order',
  description: 'Retrieve an order by its ID.',

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
      const order = await Order.findOne({ id: inputs.id });

      if (!order) {
        return exits.notFound({ error: 'Order not found' });
      }

      return exits.success({ order });
    } catch (error) {
      sails.log.error('Error retrieving order:', error);
      return exits.serverError({ error: 'An error occurred while retrieving the order' });
    }
  }
};
