const { Router } = require('express')

const { blog } = require('../controllers')

const paginate = require('../middleware/pagination').paginateBy(6)

const router = Router()

router.get('/', (req, res) => res.redirect('/posts'))
router.get([
  '/posts',
  '/posts/page/:page'
],
  blog.layout.fetch,
  paginate(blog.posts.fetch()),
  blog.posts.transform,
  blog.posts.render
)

router.get([
  '/categories/:categoryid',
  '/categories/:categoryid/:slug',
  '/categories/:categoryid/page/:page',
  '/categories/:categoryid/:slug/page/:page'
],
  blog.layout.fetch,
  blog.categoryPosts.sluggify,
  paginate(blog.posts.fetch('category')),
  blog.posts.transform,
  blog.posts.render
)

router.get([
  '/search',
  '/search/page/:page'
],
  blog.layout.fetch,
  paginate(blog.posts.fetch('search')),
  blog.posts.transform,
  blog.search.render
)

router.get([
  '/posts/:postid',
  '/posts/:postid/:slug'
],
  blog.layout.fetch,
  blog.post.sluggify,
  blog.post.fetch,
  blog.post.transform,
  blog.post.render
)

module.exports = router
