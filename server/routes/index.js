const { Router } = require('express')

const ctrl = require('../controllers/main-controller')

const router = Router()

router.get('/posts', ctrl.renderPosts)
router.get('/post/:postid', ctrl.renderPost)
router.get('/admin', ctrl.renderAdmin)

module.exports = router
