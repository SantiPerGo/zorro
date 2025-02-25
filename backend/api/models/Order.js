/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'orders',
  primaryKey: 'order_id',
  attributes: {
    order_id: {
      type: 'number',
      autoIncrement: true,
      columnType: 'int',
      unique: true
    },

    user_id: {
      model: 'User',
      required: true
    },

    status_id: {
      model: 'OrderStatus',
      required: true
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
      via: 'order_id'
    }
  },

};

