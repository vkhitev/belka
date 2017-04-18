const { pipe } = require('ramda')
const express = require('express')
const app = express()

const middleware = pipe(
  require('./config/views'),
  require('./config/middleware'),
  require('./config/epilogue'),
  require('./config/routes')
)

module.exports = middleware(app)
