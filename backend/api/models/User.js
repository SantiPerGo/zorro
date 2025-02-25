/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    username: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    }
  },

  customToJSON: function() {
    return _.omit(this, ['password']);
  },

  // Hash password before creating a User
  beforeCreate: async (values, proceed) => {
    if (values.password) {
      values.password = await sails.helpers.passwords.hashPassword(values.password);
    }
    return proceed();
  },

  // Relationship with Orders (One-to-Many)
  orders: {
    collection: 'Order',
    via: 'userId'
  }
};

