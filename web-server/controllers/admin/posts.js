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
    res.render('admin/posts', {
      posts,
      layout: 'admin',
      title: 'Belka | Admin'
    })
  } catch (err) {
    error(req, res, err)
  }
}
