const rp = require('request-promise')

const apiOptions = {
  server: 'http://127.0.0.1:3000'
}
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://belka.kpi.ua'
}

function showError (req, res, status) {
  let title, content
  if (status === 404) {
    title = '404, page not found'
    content = 'Перейдите на главную страницу: ' + apiOptions.server
  } else if (status === 500) {
    title = '500, internal server error'
    content = 'Проблема на сервере, попробуйте зайти позже.'
  } else {
    title = status + ", something's gone wrong"
    content = 'Что-то пошло не так, попробуйте зайти позже.'
  }
  res.status(status)
  res.render('error', {
    error: title,
    message: content
  })
}

module.exports = {
  renderHomepage (req, res) {
    res.redirect('/posts')
  },

  renderPosts (req, res) {
    rp(`${apiOptions.server}/api/posts?sort=-eventDate`, { json: true })
      .then(posts => {
        res.render('index', {
          layout: 'main',
          title: 'Belka | Лента',
          posts
        })
      })
      .catch(err => {
        showError(req, res, err.status)
      })
  },

  renderPost (req, res) {
    const postid = req.params.postid
    Promise.all([
      rp(`${apiOptions.server}/api/posts/${postid}`, { json: true }),
      rp(`${apiOptions.server}/api/podcasts/?PostId=${postid}`, { json: true }),
      rp(`${apiOptions.server}/api/post_images/?PostId=${postid}`, { json: true })
    ]).then(([post, podcasts, images]) => {
      res.render('post', {
        layout: 'main',
        title: 'Belka | ' + post.name,
        podcasts,
        post,
        images
      })
    }).catch(err => {
      showError(req, res, err.status)
    })
  },

  renderAdmin (req, res) {
    res.render('admin')
  }
}
