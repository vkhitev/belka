const IntervalTree = require('interval-tree2')

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
  const carousels = Array.from($('[id^=podcast-carousel]')).map($)
  carousels.forEach(disableLoopControls)
  carousels.forEach(synchronizeAudio)
}

function createIntervalTree (root, marks) {
  const itree = new IntervalTree(root)
  for (let i = 0; i < marks.length - 1; i += 1) {
    itree.add(marks[i], marks[i + 1], i)
  }
  return itree
}

function getValue (itree, key) {
  return itree.search(key)[0].id
}

function synchronizeAudio (carousel, marks) {
  const slider = carousel.find('[id^=podcast-slider]')
  const audio = carousel.siblings('[id^=podcast-audio]')
  audio.on('loadedmetadata', e => {
    marks = [0, 2, 4, 200, 400, 600, 800, e.target.duration]
    const itree = createIntervalTree(e.target.duration / 2, marks)

    audio.on('seeked', onseeked)
    audio.on('timeupdate', onseeked)

    function onseeked (e) {
      const slide = getValue(itree, e.target.currentTime)
      slider.carousel(slide)
    }
  })
}

$(document).ready(function () {
  initCarousels()
})
