const fs = require('fs')
const path = require('path')
const R = require('ramda')

const db = require('../models')
const epilogue = require('epilogue')

const basename = path.basename(module.filename)
const resources = {}

function isResourceFile (file) {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  )
}

const getBasename = file => path.basename(file)

const extractFilename = R.pipe(
  getBasename,
  R.replace(/.js$/, '')
)

fs
  .readdirSync(__dirname)
  .filter(isResourceFile)
  .forEach(file => {
    resources[extractFilename(file)] = require(path.join(__dirname, file))(db, epilogue)
  })

module.exports = resources
