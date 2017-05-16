const { R, fetchData, format, error } = require('../util')

function sluggedBy (attr, apiUrl, action, prefix, route, ...handlers) {
  function addSlug (path, id, handler) {
    return async function (req, res) {
      try {
        const slug = await fetchData({
          url: `${apiUrl}/${req.params[id]}`,
          attributes: [attr],
          transform: {
            [attr]: format.slugifyOne
          }
        })
        if (req.params.slug === slug[attr]) {
          handler(req, res)
        } else {
          res.redirect(`/${prefix}/${path}/${req.params[id]}/${slug[attr]}`)
        }
      } catch (err) {
        error(req, res, err)
      }
    }
  }
  const path = route.match(/\/(.+)\//)[1]
  const id = route.match(/:(.+)/)[1]
  action(
    [route, route + '/:slug'],
    ...R.init(handlers),
    addSlug(path, id, R.last(handlers)))
}

module.exports = sluggedBy
