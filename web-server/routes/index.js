const { Router } = require('express')

const postsController = require('../controllers/posts')
const adminController = require('../controllers/admin')

const auth = require('../middleware/auth')
const slugged = require('../middleware/slugged')

const router = Router()
router.get = router.get.bind(router)

router.get('/', postsController.renderHomepage)
router.get('/posts', postsController.renderPosts)

slugged(router.get, '/posts/:postid', postsController.renderPost)
slugged(router.get, '/categories/:categoryid', postsController.renderCategoryPost)

router.get('/search', postsController.renderSearch)

router.get('/login', adminController.renderLogin)
router.get('/admin', adminController.renderAdmin)
router.get('/admin/add_post', adminController.renderAddPost)

router.post('/login', adminController.postLogin)
router.get('/logout', adminController.logout)

module.exports = router
