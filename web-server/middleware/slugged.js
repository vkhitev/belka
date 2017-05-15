const { R, fetchData, format } = require('../util')

function sluggedBy (attr, apiUrl, action, route, ...handlers) {
  function addSlug (path, id, handler) {
    return function (req, res) {
      fetchData({
        url: `${apiUrl}/${req.params[id]}`,
        attributes: [attr],
        transform: {
          [attr]: format.slugifyOne
        }
      }).then(slug => {
        if (req.params.slug === slug[attr]) {
          handler(req, res)
        } else {
          res.redirect(`/${path}/${req.params[id]}/${slug[attr]}`)
        }
      })
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
