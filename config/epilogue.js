const epilogue = require('epilogue')
const db = require('../api/models')

module.exports = function (app) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize,
    base: '/api'
  })

  epilogue.resource({
    model: db.Post,
    endpoints: ['/posts', '/posts/:id']
  })

  epilogue.resource({
    model: db.Podcast,
    endpoints: ['/podcasts', '/podcasts/:id']
  })
}
