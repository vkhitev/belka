const { Router } = require('express')

const { admin } = require('../controllers')

// const auth = require('../middleware/auth')
const sluggedBy = require('../middleware/slugged')

const router = Router()
router.get = router.get.bind(router)

router.get('/login', admin.login.get)
router.post('/login', admin.login.post)

router.get('/', admin.posts)
router.get('/create_post', admin.createPost)
sluggedBy('name', 'posts', router.get, '/edit_post/:postid', admin.editPost)

module.exports = router
