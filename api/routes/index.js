const { Router } = require('express')

// const ctrl = require('../controllers/main-controller')

const router = Router()

// router.get('/posts', ctrl)

router.get('/posts', (req, res) => {
  res.send('СКАЖИ МЯУ')
})

router.get('/posts/:postid', (req, res) => {
  res.send(`${req.params.postid}`)
})

router.get('/podcasts', (req, res) => {

})

router.get('/podcasts/:podcastid', (req, res) => {

})

module.exports = router
