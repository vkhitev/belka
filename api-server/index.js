const epilogue = require('epilogue')
const { sequelize } = require('./models')

module.exports = function registerApiRoutes (base, app) {
  epilogue.initialize({ app, sequelize, base })
  require('./resources')
}
