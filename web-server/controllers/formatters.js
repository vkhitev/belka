const R = require('ramda')
const slug = require('slug')

const moment = require('moment')
moment.locale('ru')

const addSlugLink = R.curry((source, obj) => {
  const slugLink = slug(obj[source], { lower: true })
  return R.assoc('slugLink', slugLink, obj)
})

module.exports = {
  prettyDate (simpleDate) {
    const date = moment.utc(simpleDate)
    const currentYear = moment().year()
    if (date.year() === currentYear) {
      return date.format('LL').slice(0, -8)
    } else {
      return date.format('LL')
    }
  },

  categories: R.pipe(
    R.project(['id', 'name']),
    R.map(addSlugLink('name')),
    R.sortBy(R.prop('name'))
  ),

  slugify: R.map(addSlugLink('name')),

  slugifyOne (str) {
    return slug(str, { lower: true })
  }
}
