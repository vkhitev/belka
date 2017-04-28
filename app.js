const path = require('path')

const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const hbs = require('./handlebars')
const routes = require('./web-server/routes')
const apiRoutes = require('./api-server/routes')
const restApi = require('./api-server/routes/epilogue')
const config = require('./config')

const app = express()

// View engine
app.engine('.hbs', hbs.engine)
app.set('views', config.viewsPath)
app.set('view engine', '.hbs')

// Middleware
app.enable('view cache')
app.use(favicon(path.join(config.publicPath, 'favicon.svg')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(config.publicPath))
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}))

// Routes
app.use('/', routes)
app.use('/api', apiRoutes)
restApi(app)

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

module.exports = app
