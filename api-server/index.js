const epilogue = require('epilogue')
const { sequelize } = require('./models')
const upload = require('./upload')
const { Router } = require('express')

module.exports = function registerApiRoutes (base, app) {
  epilogue.initialize({ app, sequelize, base })

  const router = new Router()

  upload(router)

  app.use(base, router)

  require('./resources')
}
