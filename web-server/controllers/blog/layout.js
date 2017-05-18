const R = require('ramda')
const { fetchData, format, formatters } = require('../../util')

exports.fetch = async function fetch (req, res, next) {
  const annual = format(await fetchData('annual'), {
    attributes: ['year', 'posts'],
    transform: {
      posts: R.map(formatters.addSlugOf('name'))
    }
  })
  const categories = format(await fetchData('categories?sort=name'), {
    attributes: ['id', 'name'],
    transformSelf: R.map(formatters.addSlugOf('name'))
  })
  req.layout = { annual, categories }
  next()
}
