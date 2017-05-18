const R = require('ramda')
const { fetchData, format, formatters } = require('../../util')

exports.fetch = function fetch (types = []) {
  if (typeof types === 'string') {
    types = [types]
  }
  function transformQuery (req, qs) {
    const extraQuery = {}
    if (types.includes('category')) {
      extraQuery.category = req.params.categoryid
    }
    if (types.includes('search')) {
      extraQuery.q = req.query.q
    }
    return R.merge(qs, extraQuery)
  }

  return async function fetchInner (req, res, next) {
    const { body: posts, headers } = await fetchData('posts', {
      qs: transformQuery(req, {
        sort: '-eventDate',
        count: req.pagination.count,
        offset: req.pagination.offset
      }),
      resolveWithFullResponse: true
    })
    req.posts = posts
    req.pagination = req.pagination.create(headers['content-range'])
    next()
  }
}

exports.transform = function transform (req, res, next) {
  req.posts = format(req.posts, {
    attributes: [
      'id', 'name', 'eventDate',
      'previewUrl', 'organizerName',
      'organizerLink', 'brief', 'categories'
    ],
    transform: {
      eventDate: formatters.prettyDate,
      categories: formatters.categoriesOfPost
    },
    transformSelf: R.map(formatters.addSlugOf('name'))
  })
  next()
}

exports.render = function render (req, res) {
  res.render('blog/posts', R.merge(req.layout, {
    posts: req.posts,
    pagination: req.pagination,
    layout: 'blog',
    title: 'Belka | Лента'
  }))
}
