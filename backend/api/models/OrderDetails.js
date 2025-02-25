/**
 * OrderDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'order_details',
  primaryKey: 'detailsId',
  attributes: {
    detailsId: {
      type: 'number',
      autoIncrement: true, // Automatically increment the value
      columnType: 'int', // Specify the column type
      required: true,
      unique: true,
      columnName: 'details_id' // Match the column name in the database
    },

    orderId: {
      model: 'Order',
      required: true,
      columnName: 'order_id'
    },

    productId: {
      model: 'Product',
      required: true,
      columnName: 'product_id'
    },

    quantity: {
      type: 'number',
      required: true,
      min: 1
    }
  },

};

