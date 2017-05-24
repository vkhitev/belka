const R = require('ramda')

module.exports = function (db, epilogue) {
  const post = epilogue.resource({
    model: db.Post,
    endpoints: ['/posts', '/posts/:id'],
    include: [db.Category]
  })

  post.use({
    create: {
      write: {
        async before (req, res, context) {
          context.categories = R.clone(req.body.categories)
          req.body.categories = []
          return context.continue
        },
        async after (req, res, context) {
          try {
            await context.instance.setCategories(context.categories)
          } catch (err) {
            return context.stop
          }
          return context.continue
        }
      }
    },
    list: {
      fetch: {
        async before (req, res, context) {
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

  return post
}
