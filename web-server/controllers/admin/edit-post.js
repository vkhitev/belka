const { R, fetchData, format, error } = require('../../util')

module.exports = async function posts (req, res) {
  const postid = req.params.postid
  try {
    const data = await fetchData([{
      name: 'post',
      url: `posts/${postid}`,
      attributes: [
        'id', 'name', 'eventDate',
        'previewUrl', 'organizerName',
        'organizerLink', 'brief', 'categories'
      ],
      transform: {
        categories: format.categoriesOfPost,
        eventDate: format.prettyDate
      }
    }, {
      url: `post_images?postId=${postid}`,
      attributes: ['id', 'url']
    }, {
      url: `podcasts?postId=${postid}`,
      attributes: ['id', 'name', 'audioUrl', 'slidesUrl', 'speaker']
    }, {
      url: 'categories',
      attributes: ['id', 'name'],
      transformSelf: R.sortBy(R.prop('name'))
    }])
    res.render('admin/edit-post', R.merge(data, {
      layout: 'admin',
      title: 'Belka | ' + data.post.name,
      action: 'Редактирование поста | ' + data.post.name
    }))
  } catch (err) {
    error(req, res, err)
  }
}
