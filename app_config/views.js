const path = require('path')

const exphbs = require('express-handlebars')

module.exports = function (app) {
  const viewsPath = path.join('app_server', 'views')
  app.engine('.hbs', exphbs({
    layoutsDir: path.join(viewsPath, 'layouts'),
    partialsDir: path.join(viewsPath, 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
  }))
  app.set('views', viewsPath)
  app.set('view engine', '.hbs')
}
