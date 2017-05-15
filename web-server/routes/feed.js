const { Router } = require('express')
const { R, fetchData, format, error } = require('../util')
const RSS = require('rss')

const router = Router()

router.get('/', async (req, res) => {
  const feed = new RSS({
    title: 'Belka podcasts',
    description: 'Belka posdasts contain audio, video and slides from seminars and lectures in Belka Space',
    feed_url: 'http://localhost:3000/feed',
    site_url: 'http://localhost:3000',
    image_url: 'http://localhost:3000/favicon.svg',
    language: 'ru',
    copyright: 'Belka Space',
    webMaster: 'Vlad Khitev',
    categories: ['technology', 'it'],
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd' // !!
    }
  })
  try {
    const podcasts = await fetchData({
      url: 'podcasts',
      attributes: ['id', 'name', 'audioUrl', 'slidesUrl', 'speaker'],
      transformSelf: R.map(format.addSlugOf('name'))
    })
    podcasts.forEach(p => {
      feed.item({
        title: p.name,
        author: p.speaker,
        url: `http://localhost:3000/posts/${p.id}/${p.nameSlug}`,
        guid: p.id,
        slides: 'asdasd'
        // audioUrl: p.audioUrl,
        // slidesUrl: p.slidesUrl
      })
    })
    res.set('Content-Type', 'text/xml')
    res.send(feed.xml())
  } catch (err) {
    error(req, res, err)
  }
})

module.exports = router
