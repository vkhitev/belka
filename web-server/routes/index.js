const { Router } = require('express')

const ctrl = require('../controllers/main-controller')

const exposeTemplates = require('../middleware/expose-templates')
const auth = require('../middleware/auth')

const router = Router()

router.get('/', exposeTemplates, ctrl.renderHomepage)
router.get('/posts', exposeTemplates, ctrl.renderPosts)
router.get('/post/:postid', exposeTemplates, ctrl.renderPost)

router.get('/login', ctrl.renderLogin)
router.get('/admin', auth, ctrl.renderAdmin)

router.post('/login', ctrl.postLogin)
router.get('/logout', ctrl.logout)

module.exports = router
