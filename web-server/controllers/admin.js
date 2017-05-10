const R = require('ramda')
const {
  apiRequest,
  formatCategory,
  formatAdminPost
} = require('./common')

module.exports = {
  renderLogin (req, res) {
    res.render('login')
  },

  postLogin (req, res) {
    if (!req.body.username || !req.body.password) {
      res.statusCode(403)
      res.send('login failed')
    } else if (req.body.username === process.env.ADMIN_USERNAME &&
               req.body.password === process.env.ADMIN_PASSWORD) {
      req.session.admin = true
      res.send('login success!')
    } else {
      res.statusCode(401)
      res.send('login failed')
    }
  },

  logout (req, res) {
    req.session.destroy()
    res.send('Logout success.')
  },

  renderAdmin (req, res) {
    apiRequest('posts')
      .then(posts => {
        res.render('admin/index', {
          posts: R.map(formatAdminPost, posts)
        })
      })
  },

  renderAddPost (req, res) {
    Promise.all([
      apiRequest('posts/1'),
      apiRequest('categories')
    ]).then(([post, categories]) => {
      res.render('admin/modify-post', {
        post: formatAdminPost(post),
        categories: R.map(formatCategory, categories)
      })
    })
  }
}
