const epilogue = require('epilogue')
const db = require('../models')

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
      model: db.Post,
      endpoints: ['/posts', '/posts/:id']
    }),

    epilogue.resource({
      model: db.Podcast,
      endpoints: ['/podcasts', '/podcasts/:id']
    }),

    epilogue.resource({
      model: db.PostImage,
      endpoints: ['/post_images', '/post_images/:id']
    }),

    epilogue.resource({
      model: db.Category,
      endpoints: ['/categories', '/categories/:id']
    }),

    epilogue.resource({
      model: db.Category,
      endpoints: ['/category_posts', '/category_posts/:id'],
      include: [db.Post]
    })
  ]

  // resources.forEach(resource => {
  //   resource.list.auth(auth)
  // })

  return app
}
