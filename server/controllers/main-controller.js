const rp = require('request-promise')

module.exports = {
  renderPosts (req, res) {
    res.render('index', {
      layout: 'main',
      title: 'Belka | Лента'
    })
  },

  renderPost (req, res) {
    res.render('post', {
      layout: 'main',
      title: 'Belka | Пост',
      post: req.params.postid
    })
  },

  renderAdmin (req, res) {
    res.render('admin')
  }
}
