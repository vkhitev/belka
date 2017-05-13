const R = require('ramda')
const path = require('path')

const sequence = [
  'Post',
  'Podcast',
  'PostImage',
  'Category'
]

function captialize (str) {
  return str.charAt(0) + str.slice(1)
}

const toCamelCase = R.pipe(
  R.replace(/[-_]([a-z])/g, x => x[1].toUpperCase()),
  captialize
)

const data = sequence.map(file => ({
  model: file,
  data: require(path.join(__dirname, file))
}))

module.exports = data
