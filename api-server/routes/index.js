const { Router } = require('express')

const router = Router()

const mainController = require('../controllers/main')

router.get('/annual', mainController.annual)

module.exports = router
