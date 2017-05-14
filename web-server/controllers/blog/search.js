const { R, fetchData, format, error } = require('../../util')

const patterns = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',

  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня'
]

const patternsSet = new Set(patterns)

function tryConvertToDate (query) {
  const items = query.split(' ')
  if (items.length !== 2) {
    return query
  }
  if (!patternsSet.has(items[1])) {
    return query
  }
  return query
}

module.exports = async function search (req, res) {
  const searchQuery = tryConvertToDate(req.query.q)
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
    res.render('blog/posts', R.merge(req.layout, {
      posts,
      layout: 'blog',
      title: 'Belka | Лента',
      searchQuery
    }))
  } catch (err) {
    error(req, res, err)
  }
}
