const specialty = require('./api/speciality');
const user = require('./api/user');
const service = require('./api/service');
const task =  require('./api/task');
const authLocal = require ('./auth/local')

function routes(app) {
  app.use('/api/specialities', specialty);
  app.use('/api/users', user);
  app.use('/api/services', service);
  app.use('/api/tasks', task);
  app.use('/auth/local', authLocal)
}

module.exports = routes;