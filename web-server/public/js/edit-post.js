/* global postId */

function toDateInputValue (date) {
  var local = new Date(date)
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}

function initCategoriesSelector () {
  const all = $('#all-categories')
  const selected = $('#selected-categories')

  all.find('option').on('dblclick', changeCategory(all, selected))
  selected.find('option').on('dblclick', changeCategory(selected, all))

  function isSelected (select, value) {
    return select.find(`option[value=${value}]`).length > 0
  }

  function changeCategory (from, to) {
    return function change (e) {
      if (!isSelected(to, e.target.value)) {
        to.append($(e.target).clone())
        to.find('option').on('dblclick', changeCategory(to, from))
        $(e.target).remove()
      }
    }
  }
}

function initPreviewImage () {
  const file = $('#preview-image-file')

  const resultBlock = $('#preview-image-block')

  file.on('change', e => {
    const src = window.URL.createObjectURL(e.target.files[0])
    const img = $('#preview-image-result')
    if (!img.length) {
      resultBlock.append(`
        <img id="preview-image-result" class="img-thumbnail" src="${src}" alt="preview">
      `)
    } else {
      img.attr('src', src)
    }
  })
}

function initPostImages () {
  const file = $('#post-images-file')
  const carousel = $('#photos-carousel')
  const indicators = carousel.find('ol')
  const inner = carousel.find('.carousel-inner')

  file.on('change', e => {
    indicators.empty()
    const files = Array.from(e.target.files)
    files.forEach((file, i) => {
      indicators.append(
        `<li data-target="#photos-carousel" data-slide-to= ${i} class="${(i === 0 ? 'active' : '')}"></li>`
      )
    })

    inner.empty()
    files.forEach((file, i) => {
      inner.append(`
        <div class="carousel-item ${(i === 0 ? 'active' : '')}">
          <img class="d-block card-img-top mx-auto" src=${window.URL.createObjectURL(file)} alt="First slide">
        </div>`)
    })
  })
}

function initSubmit () {
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

  $('#general-edit-form').validate({
    rules: {
      name: 'required',
      organizerName: 'required',
      eventDate: 'required'
    },
    errorClass: 'form-invalid'
  })

  $('#general-edit-form').submit(function (e) {
    e.preventDefault()
    const form = $(this)

    if (!form.valid()) {
      return
    }

    const $inputs = $(e.target).find(':input')
    const values = {}
    $inputs.each(function () {
      if (this.name) {
        if (this.name === 'categories') {
          values[this.name] = Array.from($(this).find('option').map((i, el) => el.value))
        } else if (this.name !== 'previewImage' && this.name !== 'postImages') {
          values[this.name] = $(this).val()
        }
      }
    })

    if (!postId) {
      fetch('/admin/create_post', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => {
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

function initDelete () {
  $('#delete-post-btn').on('click', function () {
    if (window.confirm('Вы уверены, что хотите удалить данный пост?')) {
      fetch(`/admin/edit_post/${postId}`, {
        method: 'DELETE'
      }).then(res => res.json())
      .then(() => {
        window.location = '/admin'
      })
      .catch(() => {
        window.alert('Не получается удалить пост')
      })
    }
  })
}

$(document).ready(function () {
  initCategoriesSelector()
  initPreviewImage()
  initPostImages()
  initSubmit()
  initDelete()

  $('#g_eventDate').val(toDateInputValue(new Date()))
})
