const { Router } = require('express')

const { blog } = require('../controllers')

const sluggedBy = require('../middleware/slugged')
const blogLayout = require('../middleware/blog-layout')

const router = Router()
router.get = router.get.bind(router)

router.get('/', blog.homepage)
router.get('/posts', blogLayout, blog.posts)
router.get('/search', blogLayout, blog.search)
sluggedBy('name', 'posts', router.get, '/posts/:postid', blogLayout, blog.post)
sluggedBy('name', 'categories', router.get, '/categories/:categoryid', blogLayout, blog.categoryPosts)

module.exports = router
