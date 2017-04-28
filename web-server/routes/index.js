const path = require('path')

const { Router } = require('express')
const hbs = require('../../handlebars')

const ctrl = require('../controllers/main-controller')

function auth (req, res, next) {
  if (req.session &&
      req.session.admin) {
    return next()
  } else {
    res.redirect('/login')
  }
}

function exposeTemplates (req, res, next) {
  const viewsPath = path.join('web-server', 'views')
  hbs.getTemplates(path.join(viewsPath, 'shared', 'templates'), {
    cache: true,
    precompiled: true
  }).then(templates => {
    const extRegex = new RegExp(hbs.extname + '$')
    templates = Object.keys(templates).map(name => ({
      name: name.replace(extRegex, ''),
      template: templates[name]
    }))
    if (templates.length > 0) {
      res.locals.templates = templates
    }

    setImmediate(next)
  }).catch(next)
}

const router = Router()

router.get('/', ctrl.renderHomepage)
router.get('/posts', exposeTemplates, ctrl.renderPosts)
router.get('/post/:postid', ctrl.renderPost)

router.get('/login', ctrl.renderLogin)
router.get('/admin', auth, ctrl.renderAdmin)

router.post('/login', ctrl.postLogin)
router.get('/logout', ctrl.logout)

module.exports = router
