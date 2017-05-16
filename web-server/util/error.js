module.exports = function error (req, res, err) {
  const status = err.statusCode
  let title, content
  if (status === 404) {
    title = '404, page not found'
    content = 'Страница не найдена'
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
