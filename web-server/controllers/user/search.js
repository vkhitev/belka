const R = require('ramda')
const fetchData = require('../fetch-data')
const format = require('../formatters')

module.exports = async function search (req, res) {
  const searchQuery = req.query.q
  try {
    const posts = await fetchData({
      url: `posts?q=${encodeURIComponent(searchQuery)}&sort=-eventDate`,
      attributes: [
        'id', 'name', 'eventDate',
        'previewUrl', 'organizerName',
        'organizerLink', 'brief', 'categories'
      ],
      transform: {
        eventDate: format.prettyDate,
        categories: format.categoriesOfPost
      },
      transformSelf: R.map(format.addSlugOf('name'))
    })
    res.send(R.merge(req.layout, {
      posts,
      layout: 'main',
      title: 'Belka | Лента',
      searchQuery
    }))
  } catch (err) {
    console.error(err)
  }
}
