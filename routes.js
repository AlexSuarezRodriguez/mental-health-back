const specialty = require('./api/speciality');
const user = require('./api/user');

function routes(app) {
  app.use('/api/specialities', specialty);
  app.use('/api/users', user);
}

module.exports = routes;