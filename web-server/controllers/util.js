const { apiServer } = require('../config')[process.env.NODE_ENV]
const rp = require('request-promise')

function normalizeUrl (url) {
  return url.startsWith('/') ? url.slice(1) : url
}

function apiRequest (url, isJson = true) {
  return rp(`${apiServer}/api/${normalizeUrl(url)}`, { json: isJson })
}

exports.apiRequest = apiRequest
