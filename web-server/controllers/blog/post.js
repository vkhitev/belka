const R = require('ramda')
const { fetchData, format, formatters } = require('../../util')

exports.sluggify = async function sluggify (req, res, next) {
  const postid = req.params.postid
  const post = await fetchData(`posts/${postid}`)
  const slug = formatters.slugifyOne(post.name)
  if (slug !== req.params.slug) {
    return res.redirect(`/posts/${postid}/${slug}`)
  }
  next()
}

exports.fetch = async function fetch (req, res, next) {
  const postid = req.params.postid
  req.post = await fetchData(`posts/${postid}`)
  req.postImages = await fetchData(`post_images?postId=${postid}`)
  req.podcasts = await fetchData(`podcasts?postId=${postid}`)
  next()
}

exports.transform = function transform (req, res, next) {
  req.post = format(req.post, {
    attributes: [
      'id', 'name', 'eventDate',
      'previewUrl', 'organizerName',
      'organizerLink', 'brief', 'categories'
    ],
    transform: {
      categories: formatters.categoriesOfPost,
      eventDate: formatters.prettyDate
    }
  })
  req.postImages = format(req.postImages, {
    attributes: ['id', 'url']
  })
  req.podcasts = format(req.podcasts, {
    attributes: [
      'id', 'name', 'audioUrl',
      'slidesUrl', 'speaker', 'podcastSlides'
    ],
    transform: {
      podcastSlides: formatters.sortBy('syncTime')
    }
  })
  next()
}

exports.render = function render (req, res, next) {
  console.log(req.podcasts)
  res.render('blog/post', R.merge(req.layout, {
    post: req.post,
    postImages: req.postImages,
    podcasts: req.podcasts,
    layout: 'blog',
    title: 'Belka | ' + req.post.name
  }))
}
