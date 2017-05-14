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
sluggedBy('name', router.get, '/posts/:postid', blogLayout, ctrl.blog.post)
sluggedBy('name', router.get, '/categories/:categoryid', blogLayout, ctrl.blog.categoryPosts)

router.get('/login', ctrl.admin.login.get)
router.post('/login', ctrl.admin.login.post)

// router.get('/login', adminController.renderLogin)
// router.get('/admin', adminController.renderAdmin)
// router.get('/admin/add_post', adminController.renderAddPost)

// router.post('/login', adminController.postLogin)
// router.get('/logout', adminController.logout)

module.exports = router
