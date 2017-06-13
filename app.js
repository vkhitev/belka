const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const hbs = require('./handlebars')
const blogRoutes = require('./web-server/routes/blog')
const adminRoutes = require('./web-server/routes/admin')
const feedRoutes = require('./web-server/routes/feed')
const registerApiRoutes = require('./api-server')
const config = require('./config')

const app = express()

app.engine('.hbs', hbs.engine)
app.set('views', config.viewsPath)
app.set('view engine', '.hbs')

if (process.env.NODE_ENV === 'production') {
  app.enable('view cache')
}

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(config.publicPath))
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}))

app.use('/', blogRoutes)
app.use('/admin', adminRoutes)
app.use('/feed', feedRoutes)
registerApiRoutes('/api', app)

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
