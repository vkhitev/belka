const { R, fetchData, format, error } = require('../../util')

module.exports = async function posts (req, res) {
  try {
    const posts = await fetchData({
      url: 'posts?sort=-eventDate',
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
      title: 'Belka | Лента'
    }))
  } catch (err) {
    error(req, res, err)
  }
}
