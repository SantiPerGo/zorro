const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify jwt',

  description: 'Verify a jwt token.',

  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    },
    res: {
      type: 'ref',
      friendlyName: 'Response',
      description: 'A reference to the response object (res).',
      required: false
    }
  },

  exits: {
    success: {
      description: 'All done.',
    },
    invalid: {
      description: 'Invalid token or no authentication present.',
    }
  },

  fn: async function (inputs, exits) {
    var req = inputs.req;

    if (req.header('authorization')) {
      // if one exists, attempt to get the header data
      var token = req.header('authorization').split('Bearer ')[1];

      // if there's nothing after "Bearer", no go
      if (!token) { return exits.invalid('There is no token'); }

      // if there is something, attempt to parse it as a JWT token
      return jwt.verify(token, sails.config.custom.jwtSecret, async (err, payload) => {
        if (err || !payload.sub) { return exits.invalid(err); }

        const user = await User.findOne(payload.sub);

        if (!user) { return exits.invalid(err); }

        // if it got this far, everything checks out, success
        req.user = user;
        return exits.success(user);
      });
    }
    return exits.invalid('No authorization header');
  }
};

