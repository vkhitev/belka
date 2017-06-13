/* global postId */

import podcastTemplate from './podcast.template'

const container = $('#podcasts-container')
let nextPodcastId = 1
let podcasts = null

async function getExistingPodcasts () {
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

export default async function init () {
  podcasts = await getExistingPodcasts()

  podcasts
    .map(podcastTemplate)
    .forEach(podcast => {
      container.append(podcast)
      $(podcast)
        .find('button[id^=delete-podcast-btn]')
        .on('click', function () {
          if (window.confirm('Вы точно хотите удалить подкаст?')) {
            podcast.remove()
          }
        })

      $(podcast)
        .find('.podcast-slider')
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          //
        })
    })

  slider.init()

  $('.add-podcast-btn').click(addPodcast)

  $('.submit-podcast-btn').click(function (e) {
    e.preventDefault()
    console.log('Форма отправляется')
  })
}

function addPodcast () {
  podcasts[nextPodcastId] = {
    id: 'new-' + nextPodcastId
  }

  container.append(podcastTemplate(podcasts[nextPodcastId]))

  nextPodcastId += 1
}

// function changeSlider () {
//   $('.podcast-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//     console.log(nextSlide)
//   })
// }
