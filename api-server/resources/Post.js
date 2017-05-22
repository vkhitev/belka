module.exports = function (db, epilogue) {
  const post = epilogue.resource({
    model: db.Post,
    endpoints: ['/posts', '/posts/:id'],
    include: [db.Category]
  })

  post.use({
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
