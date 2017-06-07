import 'bootstrap/dist/css/bootstrap.css'
import '../css/admin.css'
import '../css/style.css'

import 'bootstrap'
import 'jquery-validation'

import initCategories from './edit-post/categories'
import initPreview from './edit-post/preview'
import initPostImages from './edit-post/post-images'
import initDeletePost from './edit-post/delete-post'
import initEditPost from './edit-post/edit-post'
import initEditPodcast from './edit-post/edit-podcasts'

function toDateInputValue (date) {
  var local = new Date(date)
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}

$(function () {
  initCategories()
  initPreview()
  initPostImages()
  initDeletePost()
  initEditPost()
  initEditPodcast()

  $('#inputDate')
    .val(toDateInputValue(new Date()))
})
