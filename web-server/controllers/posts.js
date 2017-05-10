const R = require('ramda')
const showError = require('./error')

const {
  formatPost,
  formatCategory,
  formatAnnual,
  unslugify,
  apiRequest
} = require('./common')

module.exports = {
  renderHomepage (req, res) {
    res.redirect('/posts')
  },

  renderPosts (req, res) {
    Promise.all([
      apiRequest('posts?sort=-eventDate'),
      apiRequest('annual'),
      apiRequest('categories')
    ]).then(([posts, annual, categories]) => {
      res.render('index', {
        layout: 'main',
        title: 'Belka | Лента',
        posts: R.map(formatPost, posts),
        annual: R.map(formatAnnual, annual),
        categories: R.map(formatCategory, categories)
      })
    }).catch(err => {
      showError(req, res, err.status)
    })
  },

  renderPost (req, res) {
    const postid = unslugify(req.params.postid)
    Promise.all([
      apiRequest(`posts/${postid}`),
      apiRequest(`annual`),
      apiRequest(`categories`),
      apiRequest(`podcasts/?PostId=${postid}`),
      apiRequest(`post_images/?PostId=${postid}`)
    ]).then(([post, annual, categories, podcasts, images]) => {
      res.render('post', {
        layout: 'main',
        title: 'Belka | ' + post.name,
        post: formatPost(post),
        podcasts,
        images,
        annual: R.map(formatAnnual, annual),
        categories: R.map(formatCategory, categories)
      })
    }).catch(err => {
      showError(req, res, err.status)
    })
  },

  renderSearch (req, res) {
    const query = req.query.query
    Promise.all([
      apiRequest(`posts?q=${encodeURIComponent(query)}&sort=-eventDate`),
      apiRequest('annual'),
      apiRequest('categories')
    ]).then(([posts, annual, categories]) => {
      res.render('index', {
        layout: 'main',
        title: 'Belka | Лента',
        posts: R.map(formatPost, posts),
        annual: R.map(formatAnnual, annual),
        categories: R.map(formatCategory, categories),
        searchQuery: query
      })
    }).catch(err => {
      showError(req, res, err.status)
    })
  },

  renderCategoryPosts (req, res) {
    const categoryid = unslugify(req.params.categoryid)
    Promise.all([
      apiRequest(`category_posts/${categoryid}`),
      apiRequest('annual'),
      apiRequest('categories')
    ]).then(([catPosts, annual, categories]) => {
      const postIds = catPosts.Posts.map(p => p.id).join(',')
      apiRequest(`posts?id=[${postIds}]`)
        .then(posts => {
          res.render('index', {
            layout: 'main',
            title: 'Belka | Лента',
            posts: R.map(formatPost, posts),
            annual: R.map(formatAnnual, annual),
            categories: R.map(formatCategory, categories)
          })
        })
    }).catch(err => {
      showError(req, res, err.status)
    })
  }
}
