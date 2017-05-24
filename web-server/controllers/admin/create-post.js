const R = require('ramda')
const { postData, fetchData, format, formatters, error } = require('../../util')

exports.fetch = async function fetch (req, res, next) {
  try {
    req.categories = await fetchData('categories')
  } catch (err) {
    error(req, res, err)
  }
  next()
}

exports.transform = function transform (req, res, next) {
  req.categories = format(req.categories, {
    transformSelf: formatters.sortBy('name')
  })
  next()
}

exports.render = function render (req, res) {
  res.render('admin/edit-post', {
    categories: req.categories,
    layout: 'admin',
    title: 'Belka | Новый пост',
    action: 'Создание нового поста'
  })
}

exports.fetchPost = function fetchPost (req, res, next) {
  req.post = R.pickAll([
    'name', 'organizerName', 'organizerLink',
    'eventDate', 'brief'
  ], req.body)
  req.categories = req.body.categories
  next()
}

exports.post = function post (req, res) {
  postData(`posts`, req.body)
    .then(result => {
      console.log(result, '!!')
      res.status(200)
      res.json({ id: result.id })
    })
    .catch(err => {
      console.log(err, '-!_!_!_')
      res.status(400)
      res.json({ err })
    })
}
