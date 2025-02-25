/**
 * OrderStatus.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'order_status',
  primaryKey: 'status_id',
  attributes: {
    status_id: {
      type: 'number',
      autoIncrement: true,
      columnType: 'int',
      unique: true
    },

    status_name: {
      type: 'string',
      required: true,
      unique: true
    },

    // Relationship with Orders (One-to-Many)
    orders: {
      collection: 'Order',
      via: 'status_id'
    }
  },

};

