const { fetchData, formatters } = require('../../util')

exports.sluggify = async function sluggify (req, res, next) {
  const categoryid = req.params.categoryid
  const category = await fetchData(`categories/${categoryid}`)
  const slug = formatters.slugifyOne(category.name)
  if (slug !== req.params.slug) {
    if (req.params.page) {
      return res.redirect(`/categories/${categoryid}/${slug}/page/${req.params.page}`)
    } else {
      return res.redirect(`/categories/${categoryid}/${slug}`)
    }
  }
  next()
}
