const { pipe } = require('ramda')
const express = require('express')
const app = express()

const middleware = pipe(
  require('./config/views'),
  require('./config/middleware'),
  require('./config/routes'),
  require('./api-server/routes/epilogue'),
  require('./config/error-routes')
)

module.exports = middleware(app)
