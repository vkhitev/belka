const rp = require('request-promise').defaults({
  json: true,
  resolveWithFullResponse: false
})
const { apiServer } = require('../config')[process.env.NODE_ENV]

function normalizeUrl (url) {
  return url.startsWith('/') ? url.slice(1) : url
}

function createFetch (apiBase) {
  return function fetch (url, options) {
    return rp(`${apiBase}/${normalizeUrl(url)}`, options)
  }
}

module.exports = createFetch(apiServer + '/api')
