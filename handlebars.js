const path = require('path')
const exphbs = require('express-handlebars')
const { viewsPath } = require('./config')

const hbs = exphbs.create({
  layoutsDir: path.join(viewsPath, 'layouts'),
  partialsDir: path.join(viewsPath, 'partials'),
  extname: '.hbs',
  helpers: {
    section (name, options) {
      if (!this._sections) {
        this._sections = {}
      }
      this._sections[name] = options.fn(this)
      return null
    }
  }
})

module.exports = hbs
