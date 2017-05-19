const { Router } = require('express')

const { blog, admin } = require('../controllers')

const auth = require('../middleware/auth')
const paginate = require('../middleware/pagination').paginateBy(2)

const router = Router()

router.get('/login', admin.login.get)
router.post('/login', admin.login.post)
router.get('/logout', admin.logout)

router.get('/', (req, res) => res.redirect('/admin/posts'))
router.get([
  '/posts',
  '/posts/page/:page'
],
  paginate(blog.posts.fetch()),
  blog.posts.transform,
  admin.posts.render
)

router.get([
  '/categories/:categoryid',
  '/categories/:categoryid/:slug',
  '/categories/:categoryid/page/:page',
  '/categories/:categoryid/:slug/page/:page'
],
  blog.categoryPosts.sluggify,
  paginate(blog.posts.fetch('category')),
  blog.posts.transform,
  admin.posts.render
)

router.get([
  '/search',
  '/search/page/:page'
],
  blog.layout.fetch,
  paginate(blog.posts.fetch('search')),
  blog.posts.transform,
  admin.search.render
)

router.get('/create_post',
  admin.createPost.fetch,
  admin.createPost.transform,
  admin.createPost.render
)

router.get([
  '/edit_post/:postid',
  '/edit_post/:postid/:slug'
],
  admin.editPost.sluggify,
  admin.editPost.fetch,
  admin.editPost.transform,
  admin.editPost.render
)

module.exports = router
