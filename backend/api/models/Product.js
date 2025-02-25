/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'products',
  primaryKey: 'product_id',
  attributes: {
    product_id: {
      type: 'number',
      autoIncrement: true,
      columnType: 'int',
      unique: true
    },

    product_name: {
      type: 'string',
      required: true,
      unique: true
    },

    price: {
      type: 'number',
      columnType: 'decimal(10,2)',
      required: true,
      min: 0
    },

    stock: {
      type: 'number',
      columnType: 'int',
      required: true,
      min: 0
    },

    // Relationship with OrderDetails (Many-to-Many via OrderDetails)
    orderDetails: {
      collection: 'OrderDetails',
      via: 'product_id'
    }
  },

};

