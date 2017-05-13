module.exports = function error (req, res, status) {
  let title, content
  if (status === 404) {
    title = '404, page not found'
    content = 'Перейдите на главную страницу'
  } else if (status === 500) {
    title = '500, internal server error'
    content = 'Проблема на сервере, попробуйте зайти позже.'
  } else {
    title = status + ", something's gone wrong"
    content = 'Что-то пошло не так, попробуйте зайти позже.'
  }
  res.status(status)
  res.render('error', {
    error: title,
    message: content
  })
}
