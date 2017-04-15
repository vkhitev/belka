require('dotenv').config()

const express = require('express')

const app = express()

require('./app_config/views')(app)
require('./app_config/middleware')(app)
require('./app_config/routes')(app)

module.exports = app
