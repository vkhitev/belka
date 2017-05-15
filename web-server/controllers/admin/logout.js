module.exports = async function logout (req, res) {
  req.session.destroy()
  res.send('Logout success.')
}
