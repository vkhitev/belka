require('dotenv').config()

const path = require('path')

const express = require('express')
const favicon = require('serve-favicon')

const app = express()

const router = require('./app_server/routes')

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.use('/', router)

app.listen(3000, () => {
  console.log('Started on http://localhost:3000')
})
