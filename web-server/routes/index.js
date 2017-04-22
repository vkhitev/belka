const { Router } = require('express')

const ctrl = require('../controllers/main-controller')

function auth (req, res, next) {
  if (req.session &&
      req.session.admin) {
    return next()
  } else {
    res.redirect('/login')
  }
}

const router = Router()

router.get('/', ctrl.renderHomepage)
router.get('/posts', ctrl.renderPosts)
router.get('/post/:postid', ctrl.renderPost)

router.get('/login', ctrl.renderLogin)
router.get('/admin', auth, ctrl.renderAdmin)

router.post('/login', ctrl.postLogin)
router.get('/logout', ctrl.logout)

module.exports = router
