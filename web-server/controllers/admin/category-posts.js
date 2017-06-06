const { fetchData, formatters, error } = require('../../util')

exports.sluggify = async function sluggify (req, res, next) {
  const categoryid = req.params.categoryid
  let category = null
  try {
    category = await fetchData(`categories/${categoryid}`)
  } catch (err) {
    error(req, res, err)
  }
  const slug = formatters.slugifyOne(category.name)
  if (slug !== req.params.slug) {
    if (req.params.page) {
      return res.redirect(`/admin/categories/${categoryid}/${slug}/page/${req.params.page}`)
    } else {
      return res.redirect(`/admin/categories/${categoryid}/${slug}`)
    }
  }
  next()
}
