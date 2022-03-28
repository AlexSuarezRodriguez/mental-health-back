const specialty = require('./api/speciality');
const user = require('./api/user');
const service = require('./api/service');

function routes(app) {
  app.use('/api/specialities', specialty);
  app.use('/api/users', user);
  app.use('/api/services', service);
}

module.exports = routes;