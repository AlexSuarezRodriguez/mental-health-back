const specialty = require('./api/speciality');
const user = require('./api/user');
const service = require('./api/service');
const task = require('./api/task');
const authLocal = require('./auth/local');
const clinicHistory = require('./api/clinicHistory');
const appoiment = require('./api/appointment')

function routes(app) {
  app.use('/api/specialities', specialty);
  app.use('/api/users', user);
  app.use('/api/services', service);
  app.use('/api/tasks', task);
  app.use('/auth/local', authLocal);
  app.use('/api/clinicHistorys', clinicHistory);
  app.use('/api/appoiments', appoiment )
}

module.exports = routes;
