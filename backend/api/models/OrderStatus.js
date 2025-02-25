/**
 * OrderStatus.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'order_status',
  primaryKey: 'statusId',
  attributes: {
    statusId: {
      type: 'number',
      autoIncrement: true, // Automatically increment the value
      columnType: 'int', // Specify the column type
      required: true,
      unique: true,
      columnName: 'status_id' // Match the column name in the database
    },

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

