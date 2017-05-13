const { Router } = require('express')

const ctrl = require('../controllers')

// const auth = require('../middleware/auth')
const slugged = require('../middleware/slugged')
const userLayout = require('../middleware/user-layout')

const router = Router()
router.get = router.get.bind(router)

router.get('/', ctrl.user.homepage)
router.get('/posts', userLayout, ctrl.user.posts)

slugged(router.get, '/posts/:postid', ctrl.user.post)
// slugged(router.get, '/categories/:categoryid', postsController.renderCategoryPost)

// router.get('/search', postsController.renderSearch)

// router.get('/login', adminController.renderLogin)
// router.get('/admin', adminController.renderAdmin)
// router.get('/admin/add_post', adminController.renderAddPost)

// router.post('/login', adminController.postLogin)
// router.get('/logout', adminController.logout)

module.exports = router
