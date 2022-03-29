require('dotenv').config();

const express = require('express');

const configExpress = require('./config/express');
const routes = require('./routes');
const conectDb = require ('./config/db')

const app = express();

configExpress(app);
routes(app);
conectDb ();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});