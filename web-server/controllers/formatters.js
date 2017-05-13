const R = require('ramda')
const slug = require('slug')

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

function slugifyOne (str) {
  return slug(str, { lower: true })
}

const categoriesOfPost = R.pipe(
  R.project(['id', 'name']),
  R.map(addSlugOf('name')),
  R.sortBy(R.prop('name'))
)

module.exports = {
  prettyDate,
  categoriesOfPost,
  addSlugOf,
  slugifyOne
}
