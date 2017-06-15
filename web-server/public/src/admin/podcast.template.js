import create from '../template'

function ifExists (value, element, fn = x => x) {
  if (Array.isArray(value) && value.length === 0) {
    return ''
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return ''
  }
  if (value == null) {
    return ''
  }
  return fn(element)
}

function ifNotExists (value, element, fn = x => x) {
  if (Array.isArray(value) && value.length === 0) {
    return fn(element)
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return fn(element)
  }
  if (value == null) {
    return fn(element)
  }
  return ''
}

function selfOrNothing (value) {
  return ifExists(value, value)
}

const map = (fn) => (arr) => arr.map(fn)

export default ({ id, name, speaker, audioUrl, podcastSlides = [] }) => create.element`
<div class="card my-4 bg-faded podcast-body" x-id=${id}>
  <div class="card-block p-4">

    <div class="form-group">
      <label for="podcast-name-${id}" class="fw-600">Название подкаста</label>
      <input type="text" class="form-control" id="podcast-name-${id}" aria-describedby="podcastNameHelp" placeholder="Название подкаста" value="${selfOrNothing(name)}">
      <small id="podcastNameHelp" class="form-text text-muted">Введите название подкаста</small>
    </div>

    <div class="form-group">
      <label for="podcast-speaker-${id}" class="fw-600">Спикер</label>
      <input type="text" class="form-control" id="podcast-speaker-${id}" aria-describedby="speakerNameHelp" placeholder="Спикер" value="${selfOrNothing(speaker)}">
      <small id="speakerNameHelp" class="form-text text-muted">Введите имя спикера</small>
    </div>

    <div class="form-group">
      <label for="podcast-presentation-${id}" class="fw-600">Презентация (PDF)</label>
      <label class="custom-file w-100">
        <input accept="application/pdf" name="podcast-presentation-${id}" type="file" class="custom-file-input" id="podcast-presentation-${id}" aria-describedby="presentationHelp">
        <span class="custom-file-control">Файл не выбран</span>
      </label>
      <small id="presentationHelp" class="form-text text-muted">Выберите презентацию</small>
    </div>

    <div class="form-group">
      <label for="podcast-audio-${id}" class="fw-600">Аудио</label>
      <label class="custom-file w-100">
        <input accept=".mp3" name="podcast-audio-${id}" type="file" class="form-control-file" id="podcast-audio-${id}" aria-describedby="audioStreamHelp">
        <span class="custom-file-control">Файл не выбран</span>
      </label>
      <small id="audioStreamHelp" class="form-text text-muted">Выберите аудиодорожку</small>
      <audio controls src="${audioUrl}" class="w-100 mt-1" id="podcast-audio-stream-${id}" style="display: none;"></audio>
    </div>

    <div class="form-group" id="podcast-slides-container-${id}">
    
      ${ifExists(podcastSlides, null, () => `
        <label for="podcast-slider-${id}" class="fw-600">Отметки времени</label>
        <div class="mx-4 podcast-slider" id="podcast-slider-${id}">
          ${podcastSlides.map(slide => `
            <img class="pod-slide" src="${slide.url}">
          `).join('')}
        </div>

        <div class="mx-auto d-flex justify-content-center">
          <div class="mr-2">
            <input class="form-control" id="podcast-slider-start-time-${id}" type="text" value="${podcastSlides[0].syncFrom}" aria-describedby="startTimeHelp">
            <small id="startTimeHelp" class="form-text text-muted text-center">От</small>
          </div>
          <div class="ml-2">
            <input class="form-control" id="podcast-slider-end-time-${id}" type="text" value="${podcastSlides[0].syncTo}" aria-describedby="endTimeHelp">
            <small id="endTimeHelp" class="form-text text-muted text-center">До</small>
          </div>
        </div>
      `)}

    </div>

    <div class="d-flex justify-content-center mt-4" id="delete-podcasts-block-${id}">
      <button id="delete-podcast-btn-${id}" class="btn btn-danger" type="button">Удалить подкаст</button>
    </div>
  </div>
</div>
`
