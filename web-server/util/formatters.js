const R = require('ramda')
const slug = require('slug')
const format = require('./format')

const moment = require('moment')
moment.locale('ru')

function prettyDate (simpleDate) {
  const date = moment.utc(simpleDate)
  const currentYear = moment().year()
  if (date.year() === currentYear) {
    return date.format('LL').slice(0, -8)
  } else {
    return date.format('LL')
  }
}

const addSlugOf = R.curry((prop, obj) => {
  const slugged = slug(obj[prop], { lower: true })
  return R.assoc(`${prop}Slug`, slugged, obj)
})

const categoriesOfPost = R.pipe(
  R.project(['id', 'name']),
  R.map(addSlugOf('name')),
  R.sortBy(R.prop('name'))
)

function dateOnly (simpleDate) {
  return moment.utc(simpleDate).format('YYYY-MM-DD')
}

function slugifyOne (str) {
  return slug(str, { lower: true })
}

const sortBy = (prop) => R.sortBy(R.prop(prop))

module.exports = {
  prettyDate,
  categoriesOfPost,
  addSlugOf,
  dateOnly,
  slugifyOne,
  sortBy
}
