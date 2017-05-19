exports.render = function render (req, res) {
  res.render('admin/posts', {
    searchQuery: req.query.q,
    posts: req.posts,
    pagination: req.pagination,
    layout: 'admin',
    title: 'Belka | Admin'
  })
}
