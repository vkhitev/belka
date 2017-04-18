const routes = require('../server/routes')
const apiRoutes = require('../api/routes')

module.exports = function (app) {
  app.use('/', routes)
  app.use('/api', apiRoutes)

  app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  })

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        error: err
      })
    })
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: {}
    })
  })

  return app
}
