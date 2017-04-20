require('dotenv').config()
const models = require('../api-server/models')
const initialData = require('./data')

models.sequelize
  .sync()
  .then(() => Promise.all(
    initialData.map(({ model, data }) => models[model].bulkCreate(data))
  ))
  .then(() => {
    console.log('Inserted')
    process.exit(0)
  })
  .catch(err => {
    console.log('Not inserted')
    console.log(err.message)
    process.exit(1)
  })
