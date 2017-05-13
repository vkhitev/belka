const R = require('ramda')
const { models } = require('../models')

function groupByYear (posts) {
  const groupedByYear = R.groupBy(post => new Date(post.eventDate).getFullYear(), posts)
  return Object.entries(groupedByYear).map(([year, posts]) => ({
    year, posts: R.project(['id', 'name'], posts)
  }))
}

module.exports = {
  annual (req, res) {
    models.post.findAll({
      attributes: ['id', 'name', 'eventDate']
    }).then(posts => {
      res.send(groupByYear(posts))
    })
  }
}
