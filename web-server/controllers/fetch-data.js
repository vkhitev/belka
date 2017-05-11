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

const applyTransform = R.curry(({
  attributes = [],
  transform = R.identity,
  transformAll = R.identity
}, data) => {
  return R.ifElse(
    R.isArrayLike,
    R.pipe(
      R.project(attributes),
      R.map(R.evolve(transform)),
      transformAll
    ),
    R.pipe(
      R.pick(attributes),
      R.evolve(transform)
    )
  )(data)
})

const request = R.compose(
  apiRequest,
  R.prop('url')
)

const fetchData = R.ifElse(
  R.isArrayLike,
  (arr) => Promise.all(R.map(request, arr))
    .then(R.zip(arr))
    .then(R.map(R.apply(applyTransform))),
  (obj) => request(obj)
    .then(applyTransform(obj))
)

module.exports = fetchData
