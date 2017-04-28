const path = require('path')
const exphbs = require('express-handlebars')
const { viewsPath, sharedPath } = require('./config')

const hbs = exphbs.create({
  layoutsDir: path.join(viewsPath, 'layouts'),
  partialsDir: [
    path.join(viewsPath, 'partials'),
    path.join(sharedPath, 'templates')
  ],
  extname: '.hbs'
})

module.exports = hbs
