module.exports = function (db, epilogue) {
  const podcast = epilogue.resource({
    model: db.Podcast,
    endpoints: ['/podcasts', '/podcasts/:id'],
    include: [{
      model: db.PodcastSlide
    }]
  })

  return podcast
}
