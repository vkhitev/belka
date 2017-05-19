const R = require('ramda')

exports.render = function render (req, res) {
  res.render('blog/posts', R.merge(req.layout, {
    searchQuery: req.query.q,
    posts: req.posts,
    pagination: req.pagination,
    layout: 'blog',
    title: 'Belka | Лента'
  }))
}
