/* global postId */

const successMsg = msg => notifyUser(`<div id="alert" class="alert alert-success mt-4" role="alert">${msg}</div>`)
const errorMsg = msg => notifyUser(`<div id="alert" class="alert alert-danger mt-4" role="alert">${msg}</div>`)

const editForm = $('#general-edit-form')
const updatePostButton = $('#update-post-btn')

function notifyUser (msg) {
  const alertText = $('#submit-block').find('#alert')
  if (alertText) {
    alertText.remove()
    $('#submit-block').append(msg)
  }
}

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
  return files || null
}

function extractPostData () {
  return {
    postData: {
      name: editForm.find('input[name=name]').val(),
      eventDate: editForm.find('input[name=eventDate]').val(),
      categories: extractCategoryIDs(),
      organizerName: editForm.find('input[name=organizerName]').val(),
      organizerLink: editForm.find('input[name=organizerLink]').val(),
      brief: editForm.find('textarea[name=brief]').val()
    },
    previewImage: extractPostImages(),
    postImages: extractPreviewImage()
  }
}

async function updatePostData (data) {
  const url = `/api/posts/${postId}`

  const response = await fetch(url, {
    method: (postId == null) ? 'POST' : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  return response.json()

  // const json = await response.json()

  // if (json.errors) {
  //   const errors = json.errors.map(e => e.message)
  //   window.alert(errors.join(','))
  // } else {
  //   console.log(json)
  // }
}

async function updatePreviewImage (data) {

}

async function updatePostImages (data) {

}

function checkFail (res) {
  if (res && res.errors) {
    console.log(res)
    errorMsg(`Ошибка: ${res.errors.map(e => e.message).join(',')}!`)
    return true
  }
  return false
}

async function iterate (methods) {
  for (const method of methods) {
    const res = await method
    if (checkFail(res)) {
      return false
    }
  }
  return true
}

function resetTitleName (name) {
  const titlePost = $('#edit-post-title').html().split('|')[0]
  const titlePage = $('title').html().split('|')[0]
  $('#edit-post-title').html(titlePost + '| ' + name)
  $('title').html(titlePage + '| ' + name)
}

async function updatePost ({ postData, previewImage, postImages }) {
  try {
    if (iterate([
      updatePostData(postData),
      resetTitleName(postData.name)
    // [updatePreviewImage, previewImage],
    // [updatePostImages, postImages]
    ])) {
      successMsg('Пост успешно ' + ((postId == null) ? 'создан' : 'обновлен!'))
    }
  } catch (error) {
    window.alert('Error on server - ' + error)
  }
}

function submitPost () {
  if (!editForm.valid()) {
    errorMsg('Заполните необходимые поля')
    return
  }
  const data = extractPostData()
  updatePost(data)
}

function initSubmit () {
  $('#general-edit-form').click(function (e) {
    e.preventDefault()
    const form = $(this)

    if (!form.valid()) {
      return false
    }

    const $inputs = $(e.target).find(':input')
    const values = {}
    $inputs.each(function () {
      if (this.name) {
        if (this.name === 'categories') {
          values[this.name] = Array.from($(this).find('option').map((i, el) => el.value))
        } else if (this.name !== 'previewImage' && this.name !== 'postImages') {
          values[this.name] = $(this).val() || null
        }
      }
    })

    // const postImages = $('input[name=postImages]')
    // uploadGallery()

    if (!postId) {
      fetch('/admin/create_post', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res)
        notifyUser(successCreate)
        setTimeout(function () {
          window.location = `/admin/edit_post/${res.id}`
        }, 700)
      })
      .catch(() => notifyUser(errorCreate))
    } else {
      fetch(`/admin/edit_post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(() => notifyUser(successUpdate))
      .catch(() => notifyUser(errorUpdate))
    }
  })
}

export default function init () {
  editForm.validate({
    rules: {
      name: 'required',
      organizerName: 'required',
      organizerLink: 'required',
      eventDate: 'required'
    },
    errorClass: 'form-invalid'
  })

  updatePostButton.on('click', submitPost)
}
