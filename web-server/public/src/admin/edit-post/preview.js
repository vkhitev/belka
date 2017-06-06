const file = $('#preview-image-file')
const resultBlock = $('#preview-image-block')

function setFileSrc (e) {
  const src = window.URL.createObjectURL(e.target.files[0])
  const img = $('#preview-image-result')
  if (!img.length) {
    resultBlock.append(`
        <img id="preview-image-result" class="img-thumbnail col-5" src="${src}" alt="preview">
      `)
  } else {
    img.attr('src', src)
  }
}

export default function init () {
  file.on('change', setFileSrc)
}
