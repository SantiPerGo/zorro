/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'products',
  primaryKey: 'productId',
  attributes: {
    productId: {
      type: 'number',
      autoIncrement: true, // Automatically increment the value
      columnType: 'int', // Specify the column type
      required: true,
      unique: true,
      columnName: 'product_id' // Match the column name in the database
    },

    productName: {
      type: 'string',
      required: true,
      unique: true,
      columnName: 'product_name'
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
      via: 'productId'
    }
  },

};

