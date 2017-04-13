const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.send('app_server/routes/index.js')
})

module.exports = router
