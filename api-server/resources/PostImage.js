module.exports = function (db, epilogue) {
  const postImage = epilogue.resource({
    model: db.PostImage,
    endpoints: ['/post_images', '/post_images/:id']
  })

  return postImage
}
