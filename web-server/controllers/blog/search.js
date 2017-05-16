const { R, fetchData, format, error } = require('../../util')

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
