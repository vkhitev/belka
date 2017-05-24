module.exports = function (db, epilogue) {
  const category = epilogue.resource({
    model: db.Category,
    endpoints: ['/categories', '/categories/:id']
  })

  return category
}
