/* global postId */

function initAudioSplit () {
  const presentations = $('[id^=presentation-]')
  const audios = $('[id^=audio-]')
  const audioSplit = $('[id^=audio-split-')
}

const html = (id) => `
<div class="card my-4 bg-faded">
  <div class="card-block p-4">

    <div class="form-group w-50">
      <label for="inputPodcastName-${id}" class="fw-600">Название подкаста</label>
      <input type="text" class="form-control" id="inputPodcastName-${id}" aria-describedby="podcastNameHelp" placeholder="Название подкаста">
      <small id="podcastNameHelp" class="form-text text-muted">Введите название подкаста</small>
    </div>

    <div class="form-group w-50">
      <label for="inputSpeakerName-${id}" class="fw-600">Спикер</label>
      <input type="text" class="form-control" id="inputSpeakerName-${id}" aria-describedby="speakerNameHelp" placeholder="Спикер">
      <small id="speakerNameHelp" class="form-text text-muted">Введите имя спикера</small>
    </div>

    <div class="form-group">
      <label for="presentation-${id}" class="fw-600">Презентация (PDF)</label>
      <input name="presentation" type="file" class="form-control-file" id="presentation-${id}" aria-describedby="presentationHelp">
      <small id="presentationHelp" class="form-text text-muted">Выберите презентацию</small>
    </div>

    <div class="form-group">
      <label for="audio-stream-${id}" class="fw-600">Аудио</label>
      <input name="audioStream", type="file" class="form-control-file" id="audio-stream-${id}" aria-describedby="audioStreamHelp">
      <small id="audioStreamHelp" class="form-text text-muted">Выберите аудиодорожку</small>
    </div>

    <div id="audio-split-${id}" class="form-group disabled w-50">
      <label class="fw-600">Отметки времени</label>
      <input type="text" class="form-control">
    </div>

    <button id="delete-podcast-btn-${id}" class="btn btn-danger pull-right mt-2" type="button">Удалить подкаст</button>
  </div>
</div>
`

function initAddPodcast () {
  let pendingId = -1
  $('#add-podcast-btn').on('click', e => {
    const card = $(e.target).closest('form').find('.card').last()
    console.log(card)
    if (card.length > 0) {
      card.after(html(pendingId--))
    } else {
      $(e.target).closest('form').prepend(html(pendingId--))
    }
  })

  $('[id^=delete-podcast-btn]').on('click', e => {
    if (window.confirm('Вы точно хотите удалить подкаст?')) {
      $(e.target).closest('.card').remove()
    }
  })
}

function initUploadData () {
  $('#podcasts-edit-form').submit(function (e) {
    e.preventDefault()
    const cards = $('#podcasts-edit-form .card')
    console.log(cards)
  })
}

$(document).ready(function () {
  initAddPodcast()
  initAudioSplit()
  initUploadData()
})

console.log('!!')
