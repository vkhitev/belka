const fs = require('fs')
const path = require('path')

const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require('../sequelize-config')[env]
const db = {}
db.models = {}

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
    db.models[model.name] = model
  })

Object.keys(db.models).forEach(modelName => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
