import IntervalTree from 'interval-tree2'

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

export default function synchronizeAudio ({ slides, audio, marks }) {
  audio.on('loadedmetadata', function (e) {
    marks = [...marks, this.duration]
    const itree = createIntervalTree(this.duration / 2, marks)

    audio.on('seeked', onseeked)
    audio.on('timeupdate', onseeked)

    function onseeked (e) {
      const slide = getValue(itree, this.currentTime)
      slides.carousel(slide)
    }
  })
}
