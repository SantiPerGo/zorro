/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // Public routes
  'GET /api/products': 'product/list',
  'POST /api/register': 'user/register',
  'POST /api/login': 'user/login',

  // Protected routes
  'GET /api/orders/:id': 'order/find',
  'POST /api/orders': 'order/register',
  'GET /api/orders/list/:userId': 'order/list'
};
