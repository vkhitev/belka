const { Router } = require('express')

const { blog } = require('../controllers')

const paginate = require('../middleware/pagination').paginateBy(2)

const router = Router()

router.get('/', blog.homepage)
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
  blog.posts.render
)

// router.get('/search', blogLayout, pagination, blog.search)
// router.get()
// sluggedBy('name', 'posts', router.get, '', '/posts/:postid/', blogLayout, blog.post)
// sluggedBy('name', 'categories', router.get, '', '/categories/:categoryid', blogLayout, blog.categoryPosts)

// router.get('/posts/page/:pageid', blogLayout, pagination, blog.posts)

module.exports = router
