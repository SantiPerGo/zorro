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
      autoIncrement: true,
      columnType: 'int',
      unique: true,
      columnName: 'details_id'
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

