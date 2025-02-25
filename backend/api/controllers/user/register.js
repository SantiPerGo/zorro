/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 */

module.exports = {
  friendlyName: 'Create user',
  description: 'Create a new user if the email does not already exist.',

  inputs: {
    username: {
      type: 'string',
      required: true,
      description: 'The username of the new user.'
    },
    email: {
      type: 'string',
      required: true,
      isEmail: true,
      description: 'The email address of the new user.'
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
      description: 'The password for the new user (must be at least 6 characters).'
    }
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'User created successfully.'
    },
    emailExists: {
      statusCode: 400,
      description: 'The provided email is already in use.'
    },
    serverError: {
      statusCode: 500,
      description: 'An unexpected error occurred while creating the user.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email: inputs.email });
      if (existingUser) {
        return exits.emailExists({ error: 'Email already exists' });
      }

      // Create the new user
      const newUser = await User.create({
        username: inputs.username,
        email: inputs.email,
        password: inputs.password
      }).fetch();

      return exits.success({
        message: 'User created successfully',
        user: newUser
      });
    } catch (error) {
      sails.log.error('Error creating user:', error);
      return exits.serverError({ error: 'An error occurred while creating the user' });
    }
  }
};
