const routesForAPI = require('./apiRoutes');

const constructor = (app) => {
  app.use('/', routesForAPI);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructor;

