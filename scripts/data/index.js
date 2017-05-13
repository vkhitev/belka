const R = require('ramda')
const path = require('path')

const sequence = [
  'post',
  'podcast',
  'post-image',
  'category'
]

const toCamelCase = R.replace(/[-_]([a-z])/g, x => x[1].toUpperCase())

const data = sequence.map(file => ({
  model: toCamelCase(file),
  data: require(path.join(__dirname, file))
}))

module.exports = data
