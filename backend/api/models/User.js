/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  primaryKey: 'userId',
  attributes: {
    userId: {
      type: 'number',
      autoIncrement: true, // Automatically increment the value
      columnType: 'int', // Specify the column type
      required: true,
      unique: true,
      columnName: 'user_id' // Match the column name in the database
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

  toJson: () => _.omit(this, ['password']),

  // Hash password before creating a User
  beforeCreate: async (values, proceed) => {
    const hashedPassword = await sails.helpers.passwords.hashPassword(values.password);
    values.password = hashedPassword;
    return proceed();
  },
};

