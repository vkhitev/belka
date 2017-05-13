const R = require('ramda')
const fetchData = require('../fetch-data')
const format = require('../formatters')

module.exports = async function post (req, res) {
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
        categories: format.categoriesOfPost
      }
    }, {
      url: `post_images?postId=${postid}`,
      attributes: ['id', 'url']
    }, {
      url: `podcasts?postId=${postid}`,
      attributes: ['id', 'name', 'audioUrl', 'slidesUrl', 'speaker']
    }])
    res.send(R.mergeAll([req.layout, data, {
      layout: 'main',
      title: 'Belka | ' + data.post.name
    }]))
  } catch (err) {
    console.error(err)
  }
}
