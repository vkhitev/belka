const { Router } = require('express')

const postsController = require('../controllers/posts')
const adminController = require('../controllers/admin')

const auth = require('../middleware/auth')

const router = Router()

router.get('/', postsController.renderHomepage)
router.get('/posts', postsController.renderPosts)
router.get('/post/:postid', postsController.renderPost)

router.get('/search', postsController.renderSearch)

router.get('/category/:categoryid', postsController.renderCategoryPosts)

router.get('/login', adminController.renderLogin)
router.get('/admin', auth, adminController.renderAdmin)

router.post('/login', adminController.postLogin)
router.get('/logout', adminController.logout)

module.exports = router
