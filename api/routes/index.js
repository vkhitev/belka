const { Router } = require('express')

const ctrlPosts = require('../controllers/posts-controller')
const ctrlPodcasts = require('../controllers/podcasts-controller')

const router = Router()

// Posts
router.get('/posts', ctrlPosts.getPosts)
router.post('/posts', ctrlPosts.createPost)
router.get('/posts/:postid', ctrlPosts.getPost)
router.put('/posts/:postid', ctrlPosts.updatePost)
router.delete('/posts/:postid', ctrlPosts.deletePost)

// Post podcasts
router.get('/posts/:postid/podcasts', ctrlPodcasts.getPodcastsByPost)

// Podcasts
router.get('/podcasts', ctrlPodcasts.getPodcasts)
router.post('/podcasts', ctrlPodcasts.createPodcast)
router.get('/podcasts/:podcastid', ctrlPodcasts.getPodcast)
router.put('/podcasts/:podcastid', ctrlPodcasts.updatePodcast)
router.delete('/podcasts/:podcastid', ctrlPodcasts.deletePodcast)

module.exports = router
