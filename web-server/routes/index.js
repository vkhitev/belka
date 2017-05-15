const { Router } = require('express')

const ctrl = require('../controllers')

// const auth = require('../middleware/auth')
const sluggedBy = require('../middleware/slugged')
const blogLayout = require('../middleware/blog-layout')

const router = Router()
router.get = router.get.bind(router)

router.get('/', ctrl.blog.homepage)
router.get('/posts', blogLayout, ctrl.blog.posts)
router.get('/search', blogLayout, ctrl.blog.search)
sluggedBy('name', 'posts', router.get, '/posts/:postid', blogLayout, ctrl.blog.post)
sluggedBy('name', 'categories', router.get, '/categories/:categoryid', blogLayout, ctrl.blog.categoryPosts)

router.get('/login', ctrl.admin.login.get)
router.post('/login', ctrl.admin.login.post)

router.get('/admin', ctrl.admin.posts)
router.get('/admin/create_post', ctrl.admin.createPost)
sluggedBy('name', 'posts', router.get, '/admin/edit_post/:postid', ctrl.admin.editPost)

module.exports = router
