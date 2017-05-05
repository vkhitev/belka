const R = require('ramda')
const moment = require('moment')
const slug = require('slug')

const { apiRequest } = require('./util')
const showError = require('./error')

moment.locale('ru')

function prettyDate (simpleDate) {
  const date = moment.utc(simpleDate)
  const currentYear = moment().year()
  if (date.year() === currentYear) {
    return date.format('LL').slice(0, -8)
  } else {
    return date.format('LL')
  }
}

const slugify = R.curry((id, source, destination, obj) => {
  return Object.assign({}, obj, {
    [destination]: slug(obj[source], { lower: true }) + '-' + obj[id]
  })
})

function unslugify (path) {
  return Number(path.match(/\d+$/)[0])
}

const formatPost = R.pipe(
  R.evolve({ eventDate: prettyDate }),
  slugify('id', 'name', 'slugLink')
)

const formatCategory = slugify('id', 'name', 'slugLink')

const formatAnnual = function (annual) {
  return Object.assign({}, annual, {
    posts: R.map(slugify('id', 'name', 'slugLink'), annual.posts)
  })
}

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
    ]).then(([posts, annual, categories]) => {
      console.log(posts)
      res.render('index', {
        layout: 'main',
        title: 'Belka | Лента',
        posts: R.map(formatPost, posts.Posts),
        annual: R.map(formatAnnual, annual),
        categories: R.map(formatCategory, categories)
      })
    }).catch(err => {
      showError(req, res, err.status)
    })
  }
}
