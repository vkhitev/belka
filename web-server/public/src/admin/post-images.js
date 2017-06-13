const files = $('#post-images-file')
const carousel = $('#photos-carousel')
const indicators = carousel.find('ol')
const inner = carousel.find('.carousel-inner')
const control = $('#photos-control')

const maxFiles = 15
const initialBorder = control.css('border-color')

function setPostImages () {
  const files = Array.from(this.files)

  if (files.length > maxFiles) {
    control.css('border-color', 'red')
    return control.html('Максимальное количество файлов: ' + maxFiles)
  }

  control.css('border-color', initialBorder)

  indicators.empty()
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

  if (this.files.length === 1) {
    control.html(this.files[0].name)
  } else {
    const len = this.files.length
    let text = 'файлов'
    if (len > 1 && len < 5) {
      text = 'файла'
    }
    control.html(this.files.length + ' ' + text)
  }
}

export default function init () {
  files.on('change', setPostImages)
}
