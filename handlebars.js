const path = require('path')
const exphbs = require('express-handlebars')
const { viewsPath } = require('./config')

const hbs = exphbs.create({
  layoutsDir: path.join(viewsPath, 'layouts'),
  partialsDir: path.join(viewsPath, 'partials'),
  extname: '.hbs',
  helpers: {
    ifCond (v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this)
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this)
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this)
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this)
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this)
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this)
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this)
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this)
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this)
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this)
        default:
          return options.inverse(this)
      }
    }
  }
})

module.exports = hbs
