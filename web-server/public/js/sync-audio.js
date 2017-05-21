const IntervalTree = require('interval-tree2')

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

module.exports = function synchronizeAudio (carousel, id, marks) {
  const slider = $(`#podcast-slider-${id}`)
  const audio = $(`#podcast-audio-${id}`)
  audio.on('loadedmetadata', e => {
    marks = [...marks, e.target.duration]
    const itree = createIntervalTree(e.target.duration / 2, marks)

    audio.on('seeked', onseeked)
    audio.on('timeupdate', onseeked)

    function onseeked (e) {
      const slide = getValue(itree, e.target.currentTime)
      slider.carousel(slide)
    }
  })
}
