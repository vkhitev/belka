const allCategories = $('#select-all-categories')
const selectedCategories = $('#select-selected-categories')
const btnDeleteCategory = $('#btn-delete-category')

// Выбрана ли категория value в списке select
function isSelected (select, value) {
  return select.find(`option[value=${value}]`).length > 0
}

// Переносит категорию из списка from в список to
function changeCategory (from, to) {
  return function change (e) {
    if (!isSelected(to, e.target.value)) {
      const clone = $(e.target).clone()
      to.append(clone)
      to.find('option')
        .off('dblclick')
        .on('dblclick', changeCategory(to, from))

      if ($(e.target).parent().get(0) === selectedCategories.get(0)) {
        clone.on('click', setDeleteButton)
      }

      $(e.target).remove()
    }
  }
}

// При нажатии на категорию из общего списка, отобразить кнопку удаления
function setDeleteButton () {
  const option = $(this)
  btnDeleteCategory.css('display', 'block')
  btnDeleteCategory.off('click')
  btnDeleteCategory.on('click', function () {
    if (window.confirm('Вы точно хотите удалить категорию "' + option.html() + '"')) {
      deleteCategory(option)
      btnDeleteCategory.css('display', 'none')
    }
  })
}

// Создаёт категорию в базе данных
async function createNewCategory () {
  const categoryName = $('#input-new-category').val()
  if (!categoryName) {
    return false
  }

  try {
    const response = await fetch(`/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName })
    })

    const json = await response.json()

    if (json.errors) {
      const errors = json.errors.map(e => e.message)
      window.alert(errors.join(','))
    } else {
      const { id, name } = json
      const newOption = $(`<option value=${id}>${name}</option>`)
      newOption.on('dblclick', changeCategory(selectedCategories, allCategories))
      selectedCategories.append(newOption)
    }
  } catch (error) {
    window.alert('Error on server - ' + error)
  }
}

// Удаляет категорию из базы данных
async function deleteCategory (option) {
  const id = option.prop('value')
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE'
    })

    const json = await response.json()

    if (json.errors) {
      const errors = json.errors.map(e => e.message)
      window.alert(errors.join(','))
    } else {
      option.remove()
    }
  } catch (error) {
    window.alert('Error on server - ' + error)
  }
}

export default function init () {
  allCategories.find('option')
    .on('dblclick', changeCategory(allCategories, selectedCategories))
    .on('click', setDeleteButton)

  selectedCategories.find('option')
    .on('dblclick', changeCategory(selectedCategories, allCategories))

  $('#btn-create-new-category')
    .on('click', createNewCategory)
}
