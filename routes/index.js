const express = require('express');

const edificiosRouter = require('./edificio.router');
const dependenciasRouter = require('./dependencia.router');

function routerApi(app) {
  const routerV1 = express.Router();

  app.use('/api/v1', routerV1);
  routerV1.use('/edificios', edificiosRouter);
  routerV1.use('/dependencias', dependenciasRouter);
}

module.exports = routerApi;
