const { R, fetchData, format, error } = require('../util')

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
