const bcrypt = require('bcrypt')
const { fetchData } = require('../../util')

async function isAuthorised (username, password) {
  const user = await fetchData({
    url: 'user_hash/' + username,
    attributes: ['hash']
  })
  return bcrypt.compare(password, user.hash)
}

exports.get = async function get (req, res) {
  res.render('admin/login')
}

exports.post = async function post (req, res) {
  const username = req.body.username
  const password = req.body.password
  isAuthorised(username, password)
    .then(result => {
      if (result) {
        req.session.admin = true
        res.send('Login success!')
      } else {
        res.status(401).send('No such user')
      }
    }).catch(() => {
      res.status(403).send('Forbidden')
    })
}
