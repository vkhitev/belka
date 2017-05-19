const { fetchData, format, formatters } = require('../../util')

exports.fetch = async function fetch (req, res, next) {
  req.categories = await fetchData('categories')
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
