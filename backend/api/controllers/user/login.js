const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Login',

  description: 'Authenticate a user and return a JWT token.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      isEmail: true,
      description: 'The email address of the user.'
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
      description: 'The password of the user (must be at least 6 characters).'
    }
  },

  exits: {
    success: {
      statusCode: 200,
      description: 'Login successful.'
    },
    badRequest: {
      statusCode: 400,
      description: 'Invalid email or password.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // Find user by email
      const user = await User.findOne({ email: inputs.email });

      if (!user) {
        return exits.badRequest({ error: 'Invalid email or password' });
      }

      // Compare password
      const passwordMatch = await bcrypt.compare(inputs.password, user.password);
      if (!passwordMatch) {
        return exits.badRequest({ error: 'Invalid email or password' });
      }

      // Generate JWT
      const token = jwt.sign(
        { sub: user.id },
        sails.config.custom.jwtSecret,
        { expiresIn: '7d' }
      );

      return exits.success({ message: 'Login successful', token });
    } catch (error) {
      sails.log.error('Login error:', error);
      return exits.serverError({ error: 'An error occurred during login' });
    }
  }
};
