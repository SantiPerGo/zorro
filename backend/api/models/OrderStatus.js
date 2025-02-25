/**
 * OrderStatus.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'order_status',
  attributes: {
    statusName: {
      type: 'string',
      required: true,
      unique: true,
      columnName: 'status_name'
    },

    // Relationship with Orders (One-to-Many)
    orders: {
      collection: 'Order',
      via: 'statusId'
    }
  },

};

