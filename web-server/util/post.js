const rp = require('request-promise').defaults({
  json: true,
  resolveWithFullResponse: false
})
const { apiServer } = require('../config')[process.env.NODE_ENV]

function normalizeUrl (url) {
  return url.startsWith('/') ? url.slice(1) : url
}

function createPost (apiBase) {
  return function fetch (url, body) {
    return rp.post(`${apiBase}/${normalizeUrl(url)}`, {
      body
    })
  }
}

module.exports = createPost(apiServer + '/api')
