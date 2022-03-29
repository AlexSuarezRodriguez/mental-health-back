const express = require('express');
const morgan = require('morgan');

function configExpress(app) {
  // lectura y parseo del body
  app.use(express.json());
  // muestra la peticion en el log
  app.use(morgan('dev'));
}

module.exports = configExpress