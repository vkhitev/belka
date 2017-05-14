require('dotenv').config()
const db = require('../api-server/models')
const initialData = require('./data')
const PostCategory = require('./data/PostCategory.json')

db.sequelize
  .sync()
  .then(() => Promise.all(
    initialData.map(({ model, data }) => db[model].bulkCreate(data))
  ))
  .then(() => db.Post.findAll())
  .then(posts => {
    return Promise.all(posts.map(post => {
      const ids = PostCategory.find(item => item.post === post.id).categories
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
