const R = require('ramda')
const fetchData = require('../fetch-data')
const format = require('../formatters')

module.exports = async function posts (req, res) {
  try {
    const posts = await fetchData({
      url: 'posts?sort=-eventDate',
      attributes: [
        'id', 'name', 'eventDate',
        'previewUrl', 'organizerName',
        'organizerLink', 'brief', 'Categories'
      ],
      transform: {
        eventDate: format.prettyDate,
        Categories: format.categoriesOfPost
      },
      transformSelf: R.map(format.addSlugOf('name'))
    })
    res.send(R.merge(req.layout, {
      posts,
      layout: 'main',
      title: 'Belka | Лента'
    }))
  } catch (err) {
    console.error(err)
  }
}
