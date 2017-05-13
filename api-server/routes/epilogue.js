const epilogue = require('epilogue')
const db = require('../models')
const models = db.models

const ForbiddenError = require('epilogue').Errors.ForbiddenError

function auth (req, res, context) {
  if (req.session &&
      req.session.admin) {
    return context.continue()
  }

  throw new ForbiddenError('Unauthorised')
}

module.exports = function (app) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize,
    base: '/api'
  })

  const resources = [
    epilogue.resource({
      model: models.post,
      endpoints: ['/posts', '/posts/:id'],
      include: [models.category]
    }),

    epilogue.resource({
      model: models.podcast,
      endpoints: ['/podcasts', '/podcasts/:id']
    }),

    epilogue.resource({
      model: models.postImage,
      endpoints: ['/post_images', '/post_images/:id']
    }),

    epilogue.resource({
      model: models.category,
      endpoints: ['/categories', '/categories/:id']
    }),

    epilogue.resource({
      model: models.category,
      endpoints: ['/category_posts', '/category_posts/:id'],
      include: [{
        model: models.post,
        include: [models.category]
      }]
    })
  ]

  // resources.forEach(resource => {
  //   resource.list.auth(auth)
  // })

  return app
}
