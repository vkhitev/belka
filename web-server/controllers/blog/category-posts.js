const { fetchData, formatters } = require('../../util')

exports.sluggify = async function sluggify (req, res, next) {
  const categoryid = req.params.categoryid
  if (!req.params.slug) {
    const category = await fetchData(`categories/${categoryid}`)
    const slug = formatters.slugifyOne(category.name)
    if (req.params.page) {
      return res.redirect(`/categories/${categoryid}/${slug}/page/${req.params.page}`)
    } else {
      return res.redirect(`/categories/${categoryid}/${slug}`)
    }
  }
  next()
}
