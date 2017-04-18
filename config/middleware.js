const path = require('path')

const express = require('express')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

module.exports = function (app) {
  app.use(favicon(path.join('web-server', 'public', 'favicon.svg')))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(express.static(path.join('web-server', 'public')))

  return app
}
