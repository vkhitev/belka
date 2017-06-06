/* global syncData */

import synchronizeAudio from './sync-audio'

function disableLoopControls (carousel) {
  const prev = carousel.children('.carousel-control-prev')
  const next = carousel.children('.carousel-control-next')
  const firstItem = carousel.find('.carousel-item:first')
  const lastItem = carousel.find('.carousel-item:last')
  carousel.on('slid.bs.carousel', e => {
    if (firstItem.hasClass('active')) {
      prev.hide()
      next.show()
    } else if (lastItem.hasClass('active')) {
      prev.show()
      next.hide()
    } else {
      prev.show()
      next.show()
    }
  })
  carousel.trigger('slid.bs.carousel')
}

function initCarousels () {
  $('[id^=podcast-carousel]').each((i, el) => {
    const id = el.id.match(/(\d+)$/)[1]
    const marks = syncData[id]
    const $el = $(el)
    disableLoopControls($el)
    synchronizeAudio($el, id, marks)
  })
}

$(document).ready(function () {
  initCarousels()
})
