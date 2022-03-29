//const specialty = require('./api/speciality');
//const user = require('./api/user');
const task =  require('./api/task');

function routes(app) {
  //app.use('/api/specialities', specialty);
 // app.use('/api/users', user);
  app.use('/api/tasks', task);
}

module.exports = routes;