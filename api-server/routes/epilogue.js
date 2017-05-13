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

  const resources = {
    Post: epilogue.resource({
      model: db.Post,
      endpoints: ['/posts', '/posts/:id'],
      include: [db.Category]
    }),

    Podcast: epilogue.resource({
      model: db.Podcast,
      endpoints: ['/podcasts', '/podcasts/:id']
    }),

    PostImage: epilogue.resource({
      model: db.PostImage,
      endpoints: ['/post_images', '/post_images/:id']
    }),

    Category: epilogue.resource({
      model: db.Category,
      endpoints: ['/categories', '/categories/:id']
    }),

    CategoryPost: epilogue.resource({
      model: db.Category,
      endpoints: ['/category_posts', '/category_posts/:id'],
      include: [{
        model: db.Post,
        include: [db.Category]
      }]
    })
  }

  resources.Post.use({
    list: {
      fetch: {
        before: function (req, res, context) {
          console.log(Object.keys(req))
          return context.continue
        }
      }
    }
  })

  // resources.forEach(resource => {
  //   resource.list.auth(auth)
  // })

  return app
}
