import initCategories from './categories'
import initPreview from './preview'
import initPostImages from './post-images'
import initDeletePost from './delete-post'
import initEditPost from './edit-post'
import initEditPodcast from './edit-podcasts'

$(function () {
  initCategories()
  initPreview()
  initPostImages()
  initDeletePost()
  initEditPost()
  initEditPodcast()
})
