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
            categories: format.categoriesOfPost
          })
        ))
      }
    })

    res.render('admin/posts', {
      posts: categoryPosts.posts,
      layout: 'admin',
      title: 'Belka | ' + categoryPosts.name
    })
  } catch (err) {
    error(req, res, err)
  }
}
