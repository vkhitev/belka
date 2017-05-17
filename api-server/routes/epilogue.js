const R = require('ramda')
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
      include: [{
        model: db.Category
      }]
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
    }),

    User: epilogue.resource({
      model: db.User,
      endpoints: ['/user_hash/:username'],
      attributes: ['hash']
    })
  }

  resources.Post.use({
    list: {
      fetch: {
        async before (req, res, context) {
          // console.log(req.query)
          context.options = context.options || {}
          context.options.distinct = true

          if (req.query.category) {
            const ids = await db.sequelize.query(
              'SELECT DISTINCT postId FROM postCategory WHERE categoryId = ?',
               { replacements: [req.query.category], type: db.sequelize.QueryTypes.SELECT }
            )

            context.options.where = {
              '$post.id$': {
                $in: ids.map(obj => obj.postId)
              }
            }
          }

          return context.continue
        }
      }
    }
  })

  // resources.CategoryPost.use({
  //   list: {
  //     fetch: {
  //       async before (req, res, context) {
  //         console.log(req.query)
  //         // const count = await db.Post.count()
  //         // res.set('content-range', count)
  //         return context.continue
  //       }
  //     }
  //   }
  // })

  return app
}
