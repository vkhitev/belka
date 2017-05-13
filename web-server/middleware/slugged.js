const fetchData = require('../controllers/fetch-data')
const fmt = require('../controllers/formatters')

// Todo: middleware between route and handler
function slugged (action, route, handler) {
  function addSlug (path, id, handler) {
    return function (req, res) {
      fetchData({
        url: `${path}/${req.params[id]}`,
        attributes: ['name'],
        transform: {
          name: fmt.slugifyOne
        }
      }).then(slug => {
        if (req.params.slug === slug.name) {
          handler(req, res)
        } else {
          res.redirect(`/${path}/${req.params[id]}/${slug.name}`)
        }
      })
    }
  }
  const path = route.match(/\/(.+)\//)[1]
  const id = route.match(/:(.+)/)[1]
  action([route, route + '/:slug'], addSlug(path, id, handler))
}

module.exports = slugged
