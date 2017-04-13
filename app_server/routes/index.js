const { Router } = require('express')

const mainController = require('../controllers/main-controller')

const router = Router()

router.get('/', mainController.getPage)

router.get('/admin', (req, res) => {
  res.render('admin', {
    message: 'Admin page'
  })
})

router.get('/post/:postid', (req, res) => {
  res.render('post', {
    message: 'Post page ' + req.params.postid
  })
})

module.exports = router
