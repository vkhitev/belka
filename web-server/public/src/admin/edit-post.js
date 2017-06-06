/* global postId */

const successCreate = '<div id="alert" class="alert alert-success mt-4" role="alert">Пост успешно создан</div>'
const successUpdate = '<div id="alert" class="alert alert-success mt-4" role="alert">Пост успешно обновлён</div>'
const errorCreate = '<div id="alert" class="alert alert-danger mb-0 mt-4" role="alert">Не удалось создать новый пост</div>'
const errorUpdate = '<div id="alert" class="alert alert-danger mb-0 mt-4" role="alert">Не удалось обновить пост</div>'

function notifyUser (msg) {
  const block = $('#submit-block').find('#alert')
  if (block) {
    block.remove()
    $('#submit-block').append(msg)
  }
}

// function uploadGallery () {
//   const previewImage = $('input[name=previewImage]')

//   var formData = new window.FormData()
//   if (previewImage.val()) {
//     var fileList = previewImage.get(0).files
//     for (var x = 0; x < fileList.length; x++) {
//       formData.append('file' + x, fileList.item(x))
//     }
//   }

//   fetch('/admin/load_gallery/', {
//     method: 'POST',
//     body: formData
//   }).then(function (res) {
//     console.log('Status', res)
//   }).catch(function (e) {
//     console.log('Error', e)
//   })
// }

function initSubmit () {
  $('#general-edit-form').validate({
    rules: {
      name: 'required',
      organizerName: 'required',
      eventDate: 'required'
    },
    errorClass: 'form-invalid'
  })

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

function toDateInputValue (date) {
  var local = new Date(date)
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}

$(document).ready(function () {
  initSubmit()
  $('#g_eventDate').val(toDateInputValue(new Date()))
})
