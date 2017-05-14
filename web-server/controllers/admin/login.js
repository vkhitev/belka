exports.get = async function get (req, res) {
  res.render('admin/login')
}

exports.post = async function post (req, res) {
  if (!req.body.username || !req.body.password) {
    res.send(403, 'login failed')
  } else if (req.body.username === process.env.ADMIN_USERNAME &&
             req.body.password === process.env.ADMIN_PASSWORD) {
    req.session.admin = true
    res.send('login success!')
  } else {
    res.send(401, 'login failed')
  }
}
