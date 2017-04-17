const app = require('express')()

require('./config/views')(app)
require('./config/middleware')(app)
require('./config/epilogue')(app)
require('./config/routes')(app)

module.exports = app
