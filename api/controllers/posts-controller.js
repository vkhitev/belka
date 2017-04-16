module.exports = {
  getPosts (req, res) {
    res.send([{
      name: 'name1',
      date: new Date()
    }, {
      name: 'name2',
      date: new Date()
    }])
  },

  createPost (req, res) {

  },

  getPost (req, res) {

  },

  updatePost (req, res) {

  },

  deletePost (req, res) {

  }
}
