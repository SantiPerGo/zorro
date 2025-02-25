/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'orders',
  attributes: {
    userId: {
      model: 'User',
      required: true,
      columnName: 'user_id'
    },

    statusId: {
      model: 'OrderStatus',
      required: true,
      columnName: 'status_id'
    },

    orderDate: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true,
      columnName: 'order_date'
    },

    // Relationship with OrderDetails (One-to-Many)
    orderDetails: {
      collection: 'OrderDetails',
      via: 'orderId'
    }
  },

};

