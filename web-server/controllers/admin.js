module.exports = {
  renderLogin (req, res) {
    res.render('login')
  },

  postLogin (req, res) {
    if (!req.body.username || !req.body.password) {
      res.statusCode(403)
      res.send('login failed')
    } else if (req.body.username === process.env.ADMIN_USERNAME &&
               req.body.password === process.env.ADMIN_PASSWORD) {
      req.session.admin = true
      res.send('login success!')
    } else {
      res.statusCode(401)
      res.send('login failed')
    }
  },

  logout (req, res) {
    req.session.destroy()
    res.send('Logout success.')
  },

  renderAdmin (req, res) {
    res.send("You can only see this after you've logged in.")
  }
}
