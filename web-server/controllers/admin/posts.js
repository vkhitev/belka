exports.render = function render (req, res) {
  res.render('admin/posts', {
    posts: req.posts,
    pagination: req.pagination,
    layout: 'admin',
    title: 'Belka | Admin'
  })
}
