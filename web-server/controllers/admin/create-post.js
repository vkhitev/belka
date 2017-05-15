const { R, fetchData, error } = require('../../util')

module.exports = async function posts (req, res) {
  try {
    const categories = await fetchData({
      url: 'categories',
      attributes: ['id', 'name'],
      transformSelf: R.sortBy(R.prop('name'))
    })
    res.render('admin/edit-post', {
      categories,
      layout: 'admin',
      title: 'Belka | Новый пост',
      action: 'Создание нового поста'
    })
  } catch (err) {
    error(req, res, err)
  }
}
