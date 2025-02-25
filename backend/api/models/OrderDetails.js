/**
 * OrderDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'order_details',
  primaryKey: 'details_id',
  attributes: {
    details_id: {
      type: 'number',
      autoIncrement: true,
      columnType: 'int',
      unique: true
    },

    order_id: {
      model: 'Order',
      required: true
    },

    product_id: {
      model: 'Product',
      required: true
    },

    quantity: {
      type: 'number',
      required: true,
      min: 1
    }
  },

};

