const { fetchData, format, formatters } = require('../../util')

exports.sluggify = async function sluggify (req, res, next) {
  const postid = req.params.postid
  const post = await fetchData(`posts/${postid}`)
  const slug = formatters.slugifyOne(post.name)
  if (slug !== req.params.slug) {
    return res.redirect(`/edit_post/${postid}/${slug}`)
  }
  next()
}

exports.fetch = async function fetch (req, res, next) {
  const postid = req.params.postid
  req.categories = await fetchData('categories')
  req.post = await fetchData(`posts/${postid}`)
  req.podcasts = await fetchData(`podcasts?postId=${postid}`)
  next()
}

exports.transform = function transform (req, res, next) {
  req.categories = format(req.categories, {
    transformSelf: formatters.sortBy('name')
  })
  req.post = format(req.post, {
    attributes: [
      'id', 'name', 'eventDate',
      'previewUrl', 'organizerName',
      'organizerLink', 'brief', 'categories'
    ],
    transform: {
      categories: format.categoriesOfPost,
      eventDate: format.prettyDate
    }
  })
  req.podcasts = format(req.podcasts, {
    attributes: ['id', 'name', 'audioUrl', 'slidesUrl', 'speaker']
  })
  next()
}

exports.render = function render (req, res) {
  res.render('admin/edit-post', {
    categories: req.categories,
    post: req.post,
    podcasts: req.podcasts,
    layout: 'admin',
    title: 'Belka | ' + req.post.name,
    action: 'Редактирование поста | ' + req.post.name
  })
}
