// const R = require('ramda')
// const showError = require('../error')
// const fetchData = require('../fetch-data')
// const fmt = require('../formatters')

// const {
//   formatPost,
//   formatCategory,
//   formatAnnual,
//   unslugify,
//   apiRequest
// } = require('../common')

// const queries = {
//   posts: {
//     url: 'posts?sort=-eventDate',
//     attributes: [
//       'id', 'name', 'eventDate',
//       'previewUrl', 'organizerName',
//       'organizerLink', 'brief', 'Categories'
//     ],
//     transform: {
//       eventDate: fmt.prettyDate,
//       Categories: fmt.categories
//     },
//     transformAll: fmt.slugify
//   },
//   annual: {
//     url: 'annual',
//     attributes: ['year', 'posts'],
//     transform: {
//       posts: fmt.slugify
//     }
//   },
//   categories: {
//     url: 'categories',
//     attributes: ['id', 'name'],
//     transformAll: fmt.categories
//   },
//   post: (id) => ({

//   })
// }

// const getQueries = R.flip(R.props)(queries)

// module.exports = {
//   renderHomepage (req, res) {
//     res.redirect('/posts')
//   },

//   renderPosts (req, res) {
//     fetchData(getQueries(['posts', 'annual', 'categories']))
//       .spread((posts, annual, categories) => {
//         res.render('index', {
//           layout: 'main',
//           title: 'Belka | Лента',
//           posts,
//           annual,
//           categories
//         })
//       }).catch(err => {
//         showError(req, res, err.status)
//       })
//   },

//   renderPost (req, res) {
//     const postid = req.params.postid
//     Promise.all([
//       apiRequest(`posts/${postid}`),
//       apiRequest(`annual`),
//       apiRequest(`categories`),
//       apiRequest(`podcasts/?PostId=${postid}`),
//       apiRequest(`post_images/?PostId=${postid}`)
//     ]).then(([post, annual, categories, podcasts, images]) => {
//       res.render('post', {
//         layout: 'main',
//         title: 'Belka | ' + post.name,
//         post: formatPost(post),
//         podcasts,
//         images,
//         annual: R.map(formatAnnual, annual),
//         categories: R.map(formatCategory, categories)
//       })
//     }).catch(err => {
//       showError(req, res, err.status)
//     })
//   },

//   renderCategoryPost (req, res) {
//     const categoryid = unslugify(req.params.categoryid)
//     Promise.all([
//       apiRequest(`category_posts/${categoryid}`),
//       apiRequest('annual'),
//       apiRequest('categories')
//     ]).then(([catPosts, annual, categories]) => {
//       const postIds = catPosts.Posts.map(p => p.id).join(',')
//       apiRequest(`posts?id=[${postIds}]`)
//       .then(posts => {
//         res.render('index', {
//           layout: 'main',
//           title: 'Belka | Лента',
//           posts: R.map(formatPost, posts),
//           annual: R.map(formatAnnual, annual),
//           categories: R.map(formatCategory, categories)
//         })
//       })
//     }).catch(err => {
//       showError(req, res, err.status)
//     })
//   },

//   renderSearch (req, res) {
//     const query = req.query.query
//     Promise.all([
//       apiRequest(`posts?q=${encodeURIComponent(query)}&sort=-eventDate`),
//       apiRequest('annual'),
//       apiRequest('categories')
//     ]).then(([posts, annual, categories]) => {
//       res.render('index', {
//         layout: 'main',
//         title: 'Belka | Лента',
//         posts: R.map(formatPost, posts),
//         annual: R.map(formatAnnual, annual),
//         categories: R.map(formatCategory, categories),
//         searchQuery: query
//       })
//     }).catch(err => {
//       showError(req, res, err.status)
//     })
//   }
// }
