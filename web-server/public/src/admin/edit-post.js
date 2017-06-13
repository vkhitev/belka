/* global postId */

function isCreating () {
  return postId == null
}

function notifyUser (msg) {
  const alertText = $('.submit-block').parent().find('#alert')
  if (alertText) {
    alertText.remove()
    $('.submit-block').parent().append(msg)
  }
}

const successMsg = msg => {
  notifyUser(`<div id="alert" class="alert alert-success mt-4" role="alert">${msg}</div>`)
  setTimeout(function () {
    $('.submit-block').parent().find('#alert').fadeOut()
  }, 5000)
}

const errorMsg = msg => notifyUser(`<div id="alert" class="alert alert-danger mt-4" role="alert">${msg}</div>`)

const editForm = $('#general-edit-form')
const updatePostButton = $('.update-post-btn')

function extractCategoryIDs () {
  return Array.from(
    $(editForm)
      .find('#select-selected-categories option')
      .map((i, el) => el.value)
    )
}

function extractPreviewImage () {
  const image = $('#preview-image-file')
  const file = image.get(0).files[0]
  return file || null
}

function extractPostImages () {
  const images = $('#post-images-file')
  const files = images.get(0).files
  return filesOrNothing(files)
}

function filesOrNothing (fileList) {
  return (fileList.length === 0) ? null : fileList
}

function extractPostData () {
  return {
    postData: {
      name: editForm.find('input[name=name]').val() || null,
      eventDate: editForm.find('input[name=eventDate]').val() || null,
      categories: extractCategoryIDs(),
      organizerName: editForm.find('input[name=organizerName]').val() || null,
      organizerLink: editForm.find('input[name=organizerLink]').val() || null,
      brief: editForm.find('textarea[name=brief]').val() || null
    },
    previewImage: extractPreviewImage(),
    postImages: extractPostImages()
  }
}

async function updatePostData (data) {
  let url = `/api/posts/${postId}`
  if (isCreating()) {
    url = `/api/posts/`
  }

  return fetch(url, {
    method: isCreating() ? 'POST' : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

function resetTitleName (name) {
  const titlePost = $('#edit-post-title').html().split('|')[0]
  const titlePage = $('title').html().split('|')[0]
  $('#edit-post-title').html(titlePost + '| ' + name)
  $('title').html(titlePage + '| ' + name)
}

async function updatePreviewImage (data, id) {
  const file = $('#preview-image-file').prop('files')[0]
  if (!file) {
    return Promise.resolve('No file')
  }

  const formData = new window.FormData()
  formData.append('preview', file)

  const url = `/api/preview_image/${id}`
  return fetch(url, {
    method: 'PUT',
    body: formData
  })
}

async function updatePostImages (data, id) {
  const files = Array.from($('#post-images-file').prop('files'))
  if (files.length === 0) {
    return Promise.resolve('No files')
  }

  const formData = new window.FormData()
  files.forEach(file => {
    formData.append('images', file)
  })

  const url = `/api/post_image/${id}`
  return fetch(url, {
    method: 'PUT',
    body: formData
  })
}

function errMsg (errors) {
  return errors
    .map(error => error.message + ': ' + error.field)
    .join('<br />')
}

async function updatePost ({ postData, previewImage, postImages }) {
  let message = ''
  let newPostId = null
  try {
    const postResponse = await updatePostData(postData)
    if (postResponse.status >= 400) {
      const body = await postResponse.json()
      message += errMsg(body.errors)
      throw message
    } else {
      const body = await postResponse.json()
      newPostId = body.id
      resetTitleName(body.name)
      message += 'Пост успешно ' + (isCreating() ? 'создан' : 'обновлен')
    }

    const previewResponse = await updatePreviewImage(previewImage, newPostId)
    console.log(previewResponse)
    if (previewResponse.status >= 400) {
      const body = await previewResponse.json()
      message += '<br />' + body.message
    } else {
      message += '<br />Превью ' + (isCreating() ? 'создано' : 'обновлено')
    }

    const imagesResponse = await updatePostImages(postImages, newPostId)
    if (imagesResponse.status >= 400) {
      const body = await imagesResponse.json()
      message += '<br />' + body.message
    } else {
      message += '<br />Галерея ' + (isCreating() ? 'создана' : 'обновлена')
    }
  } catch (error) {
    errorMsg('Не удалось ' + (isCreating() ? 'создать' : 'обновить') + ' пост:<br />' + error)
  }
  successMsg(message)
}

function submitPost () {
  if (!editForm.valid()) {
    errorMsg('Заполните необходимые поля')
    return
  }
  const data = extractPostData()
  updatePost(data)
}

export default function init () {
  editForm.validate({
    rules: {
      name: 'required',
      organizerName: 'required',
      organizerLink: {
        required: false,
        url: true
      },
      eventDate: 'required'
    },
    errorClass: 'form-invalid'
  })

  updatePostButton.on('click', submitPost)
}
