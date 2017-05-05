const path = require('path')
const exphbs = require('express-handlebars')
const { viewsPath } = require('./config')

const hbs = exphbs.create({
  layoutsDir: path.join(viewsPath, 'layouts'),
  partialsDir: path.join(viewsPath, 'partials'),
  extname: '.hbs'
})

module.exports = hbs
