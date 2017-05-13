const R = require('ramda')
const rp = require('request-promise')
const Promise = require('bluebird')

const { apiServer } = require('../config')[process.env.NODE_ENV]

function normalizeUrl (url) {
  return url.startsWith('/') ? url.slice(1) : url
}

function apiRequest (url, isJson = true) {
  return rp(`${apiServer}/api/${normalizeUrl(url)}`, { json: isJson })
}

const toCamelCase = R.replace(/[-_]([a-z])/g, x => x[1].toUpperCase())

const applyTransform = R.curry(({
  url,
  name = toCamelCase(url.replace(/\?.+/, '')),
  attributes = [],
  transform = R.identity,
  transformSelf = R.identity
}, data) => {
  return R.pair(name, R.ifElse(
    R.isArrayLike,
    R.pipe(
      R.project(attributes),
      R.map(R.evolve(transform)),
      transformSelf
    ),
    R.pipe(
      R.pick(attributes),
      R.evolve(transform)
    )
  )(data))
})

const request = R.compose(
  apiRequest,
  R.prop('url')
)

const fetchData = R.ifElse(
  R.isArrayLike,
  (arr) => Promise.all(R.map(request, arr))
    .then(R.zip(arr))
    .then(R.map(R.apply(applyTransform)))
    .then(R.fromPairs),
  (obj) => request(obj)
    .then(applyTransform(obj))
    .then(R.nth(1))
)

module.exports = fetchData
