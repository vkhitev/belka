const path = require('path')

const sequence = [
  'Post',
  'Podcast',
  'PostImage',
  'Category'
]

const data = sequence.map(file => ({
  model: file,
  data: require(path.join(__dirname, file))
}))

module.exports = data
