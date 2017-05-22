const db = require('./models')

async function isAuthorised (username, password) {
  const user = await db.User.findOne({ username })
  // return bcrypt.compare(password, user.hash)
}

isAuthorised('admin')

// exports.get = async function get (req, res) {
//   res.render('admin/login')
// }

// exports.post = async function post (req, res) {
//   const username = req.body.username
//   const password = req.body.password
//   isAuthorised(username, password)
//     .then(result => {
//       if (result) {
//         req.session.admin = true
//         res.send('Login success!')
//       } else {
//         res.status(401).send('No such user')
//       }
//     }).catch(() => {
//       res.status(403).send('Forbidden')
//     })
// }
