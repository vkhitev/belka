function auth (req, res, next) {
  if (req.session &&
      req.session.admin) {
    return next()
  } else {
    res.redirect('/login')
  }
}

module.exports = auth
