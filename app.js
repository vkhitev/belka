require('dotenv').config()

const express = require('express')

const app = express()

require('./config/views')(app)
require('./config/middleware')(app)
require('./config/routes')(app)

module.exports = app
