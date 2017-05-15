const { Router } = require('express')

const { admin } = require('../controllers')

const auth = require('../middleware/auth')
const sluggedBy = require('../middleware/slugged')

const router = Router()
router.get = router.get.bind(router)

router.get('/login', admin.login.get)
router.post('/login', admin.login.post)
router.get('/logout', admin.logout)

router.get('/', auth, admin.posts)
router.get('/create_post', auth, admin.createPost)
sluggedBy('name', 'posts', router.get, '/edit_post/:postid', auth, admin.editPost)

module.exports = router
