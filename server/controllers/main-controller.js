const rp = require('request-promise')

const apiOptions = {
  // server: 'http://localhost:3000'
  server: 'http://127.0.0.1:3000'
}
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://belka.kpi.ua'
}

module.exports = {
  renderBriefPosts (req, res) {
    console.log(`${apiOptions.server}/api/posts`)
    rp(`${apiOptions.server}/api/posts`, { json: true })
      .then(posts => {
        console.log(posts)
        res.render('index', {
          layout: 'main',
          title: 'Belka | Лента',
          posts
        })
      })
      .catch(console.log) // TODO
  },

  renderPost (req, res) {
    rp(`${apiOptions.server}/api/podcasts/`, { json: true })
      .then(podcasts => {
        res.render('post', {
          layout: 'main',
          title: 'Belka | Пост',
          post: req.params.postid
        })
      })
  },

  renderAdmin (req, res) {
    res.render('admin')
  }
}
