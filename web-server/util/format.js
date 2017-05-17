const R = require('ramda')

const format = R.curry((data, {
  attributes = [],
  transform = R.identity,
  transformSelf = R.identity
}) => {
  if (R.isArrayLike(data)) {
    return R.pipe(
      R.project(attributes),
      R.map(R.evolve(transform)),
      transformSelf
    )(data)
  } else {
    return R.pipe(
      R.pick(attributes),
      R.evolve(transform)
    )(data)
  }
})

module.exports = format
