const { fetchData, format, formatters, error } = require('../../util')
const deleteRequest = require('../../util/delete-request')

exports.sluggify = async function sluggify (req, res, next) {
  const postid = req.params.postid
  const post = await fetchData(`posts/${postid}`)
  const slug = formatters.slugifyOne(post.name)
  if (slug !== req.params.slug) {
    return res.redirect(`/admin/edit_post/${postid}/${slug}`)
  }
  next()
}

exports.fetch = async function fetch (req, res, next) {
  const postid = req.params.postid
  try {
    req.categories = await fetchData('categories')
    req.post = await fetchData(`posts/${postid}`)
    req.podcasts = await fetchData(`podcasts?postId=${postid}`)
    req.images = await fetchData(`post_images?postId=${postid}`)
  } catch (err) {
    error(req, res, err)
  }
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
      categories: formatters.categoriesOfPost,
      eventDate: formatters.dateOnly
    }
  })
  req.podcasts = format(req.podcasts, {
    attributes: ['id', 'name', 'audioUrl', 'slidesUrl', 'speaker']
  })

  const postCategories = req.post.categories.map(c => c.id)
  req.categories = req.categories.filter(c =>
    !postCategories.includes(c.id))

  next()
}

exports.render = function render (req, res) {
  res.render('admin/edit-post', {
    postImages: req.images,
    categories: req.categories,
    post: req.post,
    podcasts: req.podcasts,
    layout: 'admin',
    title: 'Belka | ' + req.post.name,
    action: 'Редактирование поста | ' + req.post.name
  })
}

exports.put = function put (req, res) {
  console.log(req.body)
  console.log(req.params.postid)
  res.json({
    ok: 1
  })
}

exports.del = function del (req, res) {
  deleteRequest('posts/' + req.params.postid)
    .then(result => {
      console.log(result)
      res.json({ statusCode: 200 })
    })
    .catch(() => {
      res.json({ statusCode: 400 })
    })
}
