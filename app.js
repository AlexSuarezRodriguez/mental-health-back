const dotenv = require('dotenv');

const express = require('express');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const configExpress = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();

const env = process.env.NODE_ENV;

if (env !== 'test') {
  connectDB();
}

configExpress(app);
routes(app);

app.use(express.static('public'));

module.exports = app;
