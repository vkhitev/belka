const routes = require('../web-server/routes')
const apiRoutes = require('../api-server/routes')

module.exports = function (app) {
  app.use('/', routes)
  app.use('/api', apiRoutes)

  return app
}
