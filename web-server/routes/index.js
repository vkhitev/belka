const { Router } = require('express')

const ctrl = require('../controllers')

// const auth = require('../middleware/auth')
const sluggedBy = require('../middleware/slugged')
const userLayout = require('../middleware/user-layout')

const router = Router()
router.get = router.get.bind(router)

router.get('/', ctrl.user.homepage)
router.get('/posts', userLayout, ctrl.user.posts)
router.get('/search', userLayout, ctrl.user.search)
sluggedBy('name', router.get, '/posts/:postid', userLayout, ctrl.user.post)
sluggedBy('name', router.get, '/categories/:categoryid', userLayout, ctrl.user.categoryPosts)

// router.get('/login', adminController.renderLogin)
// router.get('/admin', adminController.renderAdmin)
// router.get('/admin/add_post', adminController.renderAddPost)

// router.post('/login', adminController.postLogin)
// router.get('/logout', adminController.logout)

module.exports = router
