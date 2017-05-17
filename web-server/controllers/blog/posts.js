const R = require('ramda')
const { fetchData, format, formatters } = require('../../util')

exports.fetch = async function fetch (req, res, next) {
  const { body, headers } = await fetchData('posts', {
    qs: {
      sort: '-eventDate',
      count: req.pagination.count,
      offset: req.pagination.offset
    },
    resolveWithFullResponse: true
  })
  const posts = format(body, {
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
  req.posts = posts
  req.pagination = req.pagination.create(headers['content-range'])
  next()
}

exports.render = async function render (req, res) {
  res.render('blog/posts', R.merge(req.layout, {
    posts: req.posts,
    pagination: req.pagination,
    layout: 'blog',
    title: 'Belka | Лента'
  }))
}
