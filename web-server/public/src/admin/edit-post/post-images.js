const file = $('#post-images-file')
const carousel = $('#photos-carousel')
const indicators = carousel.find('ol')
const inner = carousel.find('.carousel-inner')

function setPostImages (e) {
  indicators.empty()
  const files = Array.from(e.target.files)
  files.forEach((file, i) => {
    indicators.append(
      `<li data-target="#photos-carousel" data-slide-to= ${i} class="${(i === 0 ? 'active' : '')}"></li>`
    )
  })

  inner.empty()
  files.forEach((file, i) => {
    inner.append(`
      <div class="carousel-item ${(i === 0 ? 'active' : '')}">
        <img class="d-block card-img-top mx-auto" src=${window.URL.createObjectURL(file)} alt="First slide">
      </div>`
    )
  })
}

export default function init () {
  file.on('change', setPostImages)
}
