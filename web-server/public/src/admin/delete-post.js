/* global postId */

const btnDeletePost = $('.delete-post-btn')

export default function initDeletePost () {
  btnDeletePost.on('click', function () {
    if (window.confirm('Вы уверены, что хотите удалить данный пост?')) {
      fetch(`/admin/edit_post/${postId}`, {
        method: 'DELETE'
      }).then(res => res.json())
        .then(res => {
          if (res.statusCode === 200) {
            window.location = '/admin'
          } else {
            window.alert('Не получается удалить пост. Ошибка ' + res.statusCode)
          }
        })
        .catch(() => {
          window.alert('Не получается удалить пост. Ошибка на сервере')
        })
    }
  })
}
