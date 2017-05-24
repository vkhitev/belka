const R = require('ramda')
const { fetchData, format, formatters, error } = require('../../util')

exports.fetch = async function fetch (req, res, next) {
  try {
    const annual = format(await fetchData('posts'), {
      attributes: ['id', 'name', 'eventDate'],
      transformSelf: R.pipe(
      R.map(formatters.addSlugOf('name')),
      formatters.groupByYear,
      formatters.sortBy('year')
    )
    })
    const categories = format(await fetchData('categories?sort=name'), {
      attributes: ['id', 'name'],
      transformSelf: R.map(formatters.addSlugOf('name'))
    })
    req.layout = { annual, categories }
  } catch (err) {
    error(req, res, err)
  }
  next()
}
