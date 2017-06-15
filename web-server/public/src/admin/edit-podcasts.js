/* global postId */

import podcastTemplate from './podcast.template'

const container = $('#podcasts-container')
let newPodcastId = -1
let podcasts = null
const uploadedImages = {}

async function fetchExistingPodcasts () {
  if (!postId) {
    return []
  }
  const response = await fetch(`/api/podcasts?postId=${postId}`)
  return response.json()
}

const slider = {
  init () {
    slider.add()
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      slider.setPosition()
    })
  },

  add () {
    $('.podcast-slider').slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      adaptiveHeight: true
    })
  },

  remove () {
    $('.slick-initialized').slick('unslick')
  },

  setPosition () {
    $('.podcast-slider').slick('setPosition')
  }
}

function setAudio () {
  const resultBlock = $(this).siblings('.custom-file-control')
  resultBlock.html(this.files[0].name)
  const src = window.URL.createObjectURL(this.files[0])
  const audio = $(this).parent().siblings('audio[id^=podcast-audio-stream]')
  audio.show()
  audio.attr('src', src)
}

async function uploadPresentation () {
  const resultBlock = $(this).siblings('.custom-file-control')
  resultBlock.html(this.files[0].name)
  const file = this.files[0]

  const formData = new window.FormData()
  formData.append('presentation', file)

  const response = await fetch('/api/split_presentation', {
    method: 'POST',
    body: formData
  })
  console.log(response)
}

function initPodcast (podcast, isNew) {
  const $podcast = $(podcastTemplate(podcast))
  if (isNew) {
    $podcast.addClass('podcast-new')
  }
  container.append($podcast)
  $podcast
    .find('button[id^=delete-podcast-btn]')
    .on('click', function () {
      if (window.confirm('Вы точно хотите удалить подкаст?')) {
        podcast.remove()
      }
    })

  $podcast
    .find('.podcast-slider')
    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      // Сохранить старое значение и обновить новое
      const inputFrom = $podcast.find(`input[id^=podcast-slider-start-time]`)
      const inputTo = $podcast.find(`input[id^=podcast-slider-end-time]`)

      podcast.podcastSlides[currentSlide].syncFrom = inputFrom.val()
      podcast.podcastSlides[currentSlide].syncTo = inputTo.val()

      if (podcast.podcastSlides[nextSlide].syncFrom) {
        inputFrom.val(podcast.podcastSlides[nextSlide].syncFrom)
        inputTo.val(podcast.podcastSlides[nextSlide].syncTo)
      } else if (nextSlide > currentSlide) {
        inputFrom.val(podcast.podcastSlides[currentSlide].syncTo)
      } else if (currentSlide > nextSlide) {
        inputTo.val(podcast.podcastSlides[currentSlide].syncFrom)
      }
    })

  if (!isNew) {
    $podcast
      .find('audio')
      .show()
  }

  $podcast
    .find('input[id^=podcast-audio]')
    .on('change', setAudio)

  $podcast
    .find('input[id^=podcast-presentation]')
    .on('change', uploadPresentation)
}

export default async function init () {
  podcasts = await fetchExistingPodcasts()
  podcasts.forEach(podcast => initPodcast(podcast, false))

  slider.init()
  $('.add-podcast-btn').click(addPodcast)
  $('.submit-podcast-btn').click(submitPodcasts)
}

function addPodcast () {
  podcasts[newPodcastId] = {
    id: newPodcastId
  }
  initPodcast(podcasts[newPodcastId], true)
  newPodcastId -= 1
}

function submitPodcasts (e) {
  e.preventDefault()
  console.log(getPreparedForSubmitData())
}

function getTimestamps (id) {
  const podcast = podcasts.find(p => p.id === id)
  return podcast.podcastSlides
    .map(slide => [slide.syncFrom, slide.syncTo])
}

function getSlides ($podcast) {

}

function getPreparedForSubmitData () {
  return $('#podcasts-container > .podcast-body').map((i, podcast) => {
    const $podcast = $(podcast)
    const isNew = $podcast.hasClass('podcast-new')
    const id = Number.parseInt(podcast.getAttribute('x-id'), 10)

    return {
      isNew,
      name: $podcast.find('input[id^=podcast-name]').val(),
      speaker: $podcast.find('input[id^=podcast-speaker]').val(),
      audio: $podcast.find('input[id^=podcast-audio]')[0].files[0] || null,
      slides: getSlides($podcast),
      timestamps: getTimestamps(id)
    }
  })
}
