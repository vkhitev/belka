/* global syncData */

import synchronizeAudio from './sync-audio'

const players = $('.podcast-player')

function disableLoopControls (carousel) {
  const prev = carousel.children('.carousel-control-prev')
  const next = carousel.children('.carousel-control-next')
  const firstItem = carousel.find('.carousel-item:first')
  const lastItem = carousel.find('.carousel-item:last')
  carousel.on('slid.bs.carousel', function (e) {
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

function getPlayerItems (players) {
  return Array.from(players.map((i, player) => {
    const $player = $(player)
    return {
      carousel: $player.find('.carousel'),
      slides: $player.find('.carousel-inner'),
      audio: $player.find('.podcast-audio'),
      marks: syncData[$player.attr('x-podcast-id')]
    }
  }))
}

export default function initPlayers () {
  getPlayerItems(players).forEach(player => {
    disableLoopControls(player.carousel)
    synchronizeAudio(player)
  })
}
