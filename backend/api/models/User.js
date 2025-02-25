/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  primaryKey: 'user_id',
  attributes: {
    user_id: {
      type: 'number',
      autoIncrement: true,
      columnType: 'int',
      unique: true
    },
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
};

