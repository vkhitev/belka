const path = require('path')
const hbs = require('../../handlebars')

function exposeTemplates (req, res, next) {
  const viewsPath = path.join('web-server', 'views')
  hbs.getTemplates(path.join(viewsPath, 'shared', 'templates'), {
    cache: true,
    precompiled: true
  }).then(templates => {
    const extRegex = new RegExp(hbs.extname + '$')
    templates = Object.keys(templates).map(name => ({
      name: name.replace(extRegex, ''),
      template: templates[name]
    }))
    if (templates.length > 0) {
      res.locals.templates = templates
    }

    setImmediate(next)
  }).catch(next)
}

module.exports = exposeTemplates
