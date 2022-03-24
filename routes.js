/**
 * Main application routes
 */
const specialty = require('./api/speciality');

function routes(app) {
  // API Routes
  app.use('/api/specialities', specialty);
}

module.exports = routes;