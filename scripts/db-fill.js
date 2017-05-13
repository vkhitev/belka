require('dotenv').config()
const db = require('../api-server/models')
const initialData = require('./data')
const postCategory = require('./data/post-category.json')

const models = db.models

db.sequelize
  .sync()
  .then(() => Promise.all(
    initialData.map(({ model, data }) => models[model].bulkCreate(data))
  ))
  .then(() => models.post.findAll())
  .then(posts => {
    return Promise.all(posts.map(post => {
      const ids = postCategory.find(item => item.post === post.id).categories
      return post.setCategories(ids)
    }))
  }).then(() => {
    console.log('Inserted')
    process.exit(0)
  })
  .catch(err => {
    console.log('Not inserted')
    console.log(err.message)
    process.exit(1)
  })
