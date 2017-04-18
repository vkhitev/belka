const fs = require('fs')
const path = require('path')

const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

let sequelize
if (config.useEnvVariable) {
  sequelize = new Sequelize(process.env[config.useEnvVariable])
} else {
  sequelize = new Sequelize(config)
}

function isModelFile (file) {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  )
}

fs
  .readdirSync(__dirname)
  .filter(isModelFile)
  .forEach(file => {
    const model = sequelize.import(file)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
