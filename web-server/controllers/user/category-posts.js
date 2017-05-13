const { R, fetchData, format, error } = require('../../util')

module.exports = async function categoryPosts (req, res) {
  const categoryid = req.params.categoryid
  try {
    const categoryPosts = await fetchData({
      url: `category_posts/${categoryid}`,
      attributes: ['name', 'posts'],
      transform: {
        posts: R.map(R.pipe(
          format.addSlugOf('name'),
          R.dissoc('postCategory'),
          R.evolve({
            eventDate: format.prettyDate,
            categories: R.map(R.pipe(
              format.addSlugOf('name'),
              R.dissoc('postCategory')
            ))
          })
        ))
      }
    })

    res.send(R.merge(req.layout, {
      categoryPosts,
      layout: 'main',
      title: 'Belka | ' + categoryPosts.name
    }))
  } catch (err) {
    console.error(err)
  }
}
