/**
 * OrderController.listOrders
 *
 * @description :: Fetch all orders.
 */

module.exports = {
  friendlyName: 'List Orders',
  description: 'Retrieve all available orders from the database.',

  inputs: {
    userId: {
      type: 'number',
      required: true,
      description: 'The ID of the user to retrieve orders.',
    }
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Orders retrieved successfully.',
    },
    serverError: {
      statusCode: 500,
      description: 'An unexpected error occurred while fetching orders.',
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Fetch orders from the database
      const orders = await Order.find({ userId: inputs.userId });

      // Search status of each order
      for (let i = 0; i < orders.length; i++) {
        const orderStatus = await OrderStatus.findOne({ id: orders[i].statusId });
        orders[i].status = orderStatus.statusName;

        delete orders[i].userId;
        delete orders[i].statusId;
      }

      // Return the orders
      return exits.success(orders);
    } catch (error) {
      sails.log.error('Error fetching orders:', error);
      return exits.serverError({ error: 'An error occurred while fetching orders' });
    }
  }
};
