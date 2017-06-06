/* global postId */

import 'slick-carousel'

function initAudioSplit () {
  const presentations = $('[id^=presentation-]')
  const audios = $('[id^=audio-]')
  const audioSplit = $('[id^=audio-split-')
}

const html = (id) => `
<div class="card my-4 bg-faded">
      <div class="card-block p-4">

        <div class="form-group">
          <label for="inputPodcastName-${id}" class="fw-600">Название подкаста</label>
          <input type="text" class="form-control" id="inputPodcastName-${id}" aria-describedby="podcastNameHelp" placeholder="Название подкаста">
          <small id="podcastNameHelp" class="form-text text-muted">Введите название подкаста</small>
        </div>

        <div class="form-group">
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
          <input name="audioStream" , type="file" class="form-control-file" id="audio-stream-${id}" aria-describedby="audioStreamHelp">
          <small id="audioStreamHelp" class="form-text text-muted">Выберите аудиодорожку</small>
        </div>

        <div class="form-group">
          <label for="slider-${id}" class="fw-600">Отметки времени</label>
          <div class="podcast-slider mx-4" id="slider-${id}">
            <img class="pod-slide" src="/content/gallery/google_summer/1.jpg">
            <img class="pod-slide" src="/content/gallery/google_summer/2.jpg">
            <img class="pod-slide" src="/content/gallery/google_summer/3.jpg">
            <img class="pod-slide" src="/content/gallery/google_summer/4.jpg">
            <img class="pod-slide" src="/content/gallery/google_summer/5.jpg">
            <img class="pod-slide" src="/content/gallery/google_summer/6.jpg">
          </div>
          <div class="mx-auto d-flex justify-content-center">
            <div class="mr-2">
              <input class="form-control" id="starttime" type="time" step="1" value="00:00:00" aria-describedby="startTimeHelp">
              <small id="startTimeHelp" class="form-text text-muted text-center">От</small>
            </div>
            <div class="ml-2">
              <input class="form-control" id="endtime" type="time" step="1" value="00:00:00" aria-describedby="endTimeHelp">
              <small id="endTimeHelp" class="form-text text-muted text-center">До</small>
            </div>
          </div>

        </div>

        <div class="d-flex justify-content-center mt-4" id="delete-podcasts-block-${id}">
          <button id="delete-podcast-btn-${id}" class="btn btn-danger" type="button">Удалить подкаст</button>
        </div>
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
    removeSlider()
    addSlider()
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

function addSlider () {
  $('.podcast-slider').slick({
    dots: true,
    infinite: false,
    slidesToShow: 1,
    adaptiveHeight: true
  })
}

function removeSlider () {
  $('.slick-initialized').slick('unslick')
}

function setSliderPosition () {
  $('.podcast-slider').slick('setPosition')
}

function initSlider () {
  addSlider()

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    setSliderPosition()
  })
}

function checkSlider () {
  let arr = []
  $('.slick-initialized').each(function (key, item) {
    console.log(this.id)
    arr.push(this)
  })
  console.log(arr)
}

$(document).ready(function () {
  initAddPodcast()
  initAudioSplit()
  initUploadData()
  initSlider()
})

console.log('!!')
