const { Router } = require('express')

const { blog } = require('../controllers')

// const sluggedBy = require('../middleware/slugged')
const paginate = require('../middleware/pagination').paginateBy(10)

const router = Router()

router.get('/', blog.homepage)
router.get(['/posts', '/posts/page/:page'],
  blog.layout.fetch,
  paginate(blog.posts.fetch),
  blog.posts.render
)

router.get(['/categories/:categoryid', '/categories/:categoryid/page/:page'],
  blog.layout.fetch,
  paginate(blog.categoryPosts.fetch),
  blog.categoryPosts.render
)

// router.get('/search', blogLayout, pagination, blog.search)
// router.get()
// sluggedBy('name', 'posts', router.get, '', '/posts/:postid/', blogLayout, blog.post)
// sluggedBy('name', 'categories', router.get, '', '/categories/:categoryid', blogLayout, blog.categoryPosts)

// router.get('/posts/page/:pageid', blogLayout, pagination, blog.posts)

module.exports = router
