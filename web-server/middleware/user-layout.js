const R = require('ramda')
const fetchData = require('../controllers/fetch-data')
const format = require('../controllers/formatters')

function fetchLayoutData () {
  return fetchData([{
    url: 'annual',
    attributes: ['year', 'posts'],
    transform: {
      posts: R.map(format.addSlugOf('name'))
    }
  }, {
    url: 'categories',
    attributes: ['id', 'name'],
    transformSelf: R.map(format.addSlugOf('name'))
  }])
}

async function addLayout (req, res, next) {
  try {
    req.layout = await fetchLayoutData()
  } catch (err) {
    console.log(err) // TODO
  }
  next()
}

module.exports = addLayout
