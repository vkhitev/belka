const file = $('#preview-image-file')
const resultBlock = $('#preview-image-block')

function setFileSrc () {
  const src = window.URL.createObjectURL(this.files[0])
  const img = $('#preview-image-result')
  if (!img.length) {
    resultBlock.append(`
        <img id="preview-image-result" class="img-thumbnail col-5" src="${src}" alt="preview">
      `)
  } else {
    img.attr('src', src)
  }

  $('#preview-control').html(this.files[0].name)
}

export default function init () {
  file.on('change', setFileSrc)
}
