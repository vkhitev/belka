const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.render('index', {
    message: 'Main page'
  })
})

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
