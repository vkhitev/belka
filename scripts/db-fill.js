require('dotenv').config()
const models = require('../api-server/models')
const posts = require('./data/post.json')
const podcasts = require('./data/podcast.json')
const postImages = require('./data/postImage.json')

models.sequelize
  .sync()
  .then(() => models.Post.bulkCreate(posts))
  .then(() => models.Podcast.bulkCreate(podcasts))
  .then(() => models.PostImage.bulkCreate(postImages))
  .then(() => {
    console.log('Inserted')
    process.exit(0)
  })
  .catch(err => {
    console.log('Not inserted')
    console.log(err.message)
    process.exit(1)
  })
