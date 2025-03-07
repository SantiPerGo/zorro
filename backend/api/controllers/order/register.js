/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 */

module.exports = {
  friendlyName: 'Create order',
  description: 'Create a new order by user, status and details.',

  inputs: {
    userId: {
      type: 'number',
      required: true,
      description: 'The id of the client making the order.'
    },
    products: {
      type: 'json',
      required: true,
      description: 'An array of products, each with a productId and quantity.',
      custom: function (value) {
        return Array.isArray(value) && value.every(item =>
          typeof item.productId === 'number' && typeof item.quantity === 'number' && item.quantity > 0
        );
      }
    }
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'Order created successfully.'
    },
    badRequest: {
      statusCode: 400,
      description: 'Invalid input data.'
    },
    notFound: {
      statusCode: 404,
      description: 'User, order status, or product not found.'
    },
    serverError: {
      statusCode: 500,
      description: 'An unexpected error occurred while creating the user.'
    }
  },

  fn: async function (inputs, exits) {
    await sails.getDatastore().transaction(async (db)=> {
      try {
        // Check if the user exists
        const user = await User.findOne({ id: inputs.userId }).usingConnection(db);
        if (!user) {
          return exits.notFound({ error: 'User not found' });
        }

        // Get pending status
        const status = await OrderStatus.findOne({ statusName: 'PENDING' }).usingConnection(db);

        // Create the order
        const newOrder = await Order.create({
          userId: inputs.userId,
          statusId: status.id
        }).usingConnection(db).fetch();

        // Insert products into order_details
        for (const item of inputs.products) {
          const product = await Product.findOne({ id: item.productId }).usingConnection(db);

          if (!product) {
            return exits.notFound({ error: `Product not found: ${item.productId}` });
          }

          if (item.quantity <= 0) {
            return exits.badRequest({ error: `Invalid quantity for product ${item.productId}` });
          }

          if (product.stock < item.quantity) {
            return exits.badRequest({ error: `Insufficient stock for product ${item.productId}` });
          }

          // Insert into order_details
          await OrderDetails.create({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity
          }).usingConnection(db);

          // Update product stock
          await Product.updateOne({ id: item.productId })
            .set({ stock: product.stock - item.quantity })
            .usingConnection(db);
        }

        return exits.success({
          message: 'Order created successfully',
          order: newOrder,
        });
      } catch (error) {
        sails.log.error('Error creating order:', error);
        return exits.serverError({ error: 'An error occurred while creating the order' });
      }
    });
  }
};
