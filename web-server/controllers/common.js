const R = require('ramda')
const moment = require('moment')
const slug = require('slug')
moment.locale('ru')

const { apiServer } = require('../config')[process.env.NODE_ENV]
const rp = require('request-promise')

function normalizeUrl (url) {
  return url.startsWith('/') ? url.slice(1) : url
}

function apiRequest (url, isJson = true) {
  return rp(`${apiServer}/api/${normalizeUrl(url)}`, { json: isJson })
}

function prettyDate (simpleDate) {
  const date = moment.utc(simpleDate)
  const currentYear = moment().year()
  if (date.year() === currentYear) {
    return date.format('LL').slice(0, -8)
  } else {
    return date.format('LL')
  }
}

function dateOnly (simpleDate) {
  return moment.utc(simpleDate).format('YYYY-MM-DD')
}

const slugify = R.curry((id, source, destination, obj) => {
  return Object.assign({}, obj, {
    [destination]: slug(obj[source], { lower: true }) + '-' + obj[id]
  })
})

function unslugify (path) {
  return Number(path.match(/\d+$/)[0])
}

const formatCategory = slugify('id', 'name', 'slugLink')

const formatPost = R.pipe(
  R.evolve({
    eventDate: prettyDate,
    Categories: R.compose(R.sortBy(R.prop('name')), R.map(formatCategory))
  }),
  slugify('id', 'name', 'slugLink')
)

const formatAdminPost = R.pipe(
  R.evolve({
    eventDate: dateOnly,
    Categories: R.compose(R.sortBy(R.prop('name')), R.map(formatCategory))
  }),
  slugify('id', 'name', 'slugLink')
)

const formatAnnual = R.evolve({
  posts: R.map(slugify('id', 'name', 'slugLink'))
})

exports.apiRequest = apiRequest
exports.slugify = slugify
exports.unslugify = unslugify
exports.formatCategory = formatCategory
exports.formatPost = formatPost
exports.formatAnnual = formatAnnual
exports.formatAdminPost = formatAdminPost
