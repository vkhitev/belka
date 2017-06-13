/* global postId */

// import { podcastEditor } from '../../templates'
// import 'slick-carousel'

async function getExistingPosts () {
  if (!postId) {
    return []
  }
  const response = await fetch(`/api/podcasts?postId=${postId}`)
  return response.json()
}

export default async function init () {
  // const posts = await getExistingPosts()
  // console.log(posts)
}

// await fetchData(`podcasts?postId=${postid}`)
// const timeStamps

// function initAddPodcast () {
//   let pendingId = -1
//   $('#add-podcast-btn').on('click', e => {
//     const card = $(e.target).closest('form').find('.card').last()
//     console.log(card)
//     if (card.length > 0) {
//       card.after(html(pendingId--))
//     } else {
//       $(e.target).closest('form').prepend(html(pendingId--))
//     }
//     removeSlider()
//     addSlider()
//     changeSlider()
//   })

//   $('[id^=delete-podcast-btn]').on('click', e => {
//     if (window.confirm('Вы точно хотите удалить подкаст?')) {
//       $(e.target).closest('.card').remove()
//     }
//   })
// }

// function initUploadData () {
//   $('#podcasts-edit-form').submit(function (e) {
//     e.preventDefault()
//     const cards = $('#podcasts-edit-form .card')
//     console.log(cards)
//   })
// }

// function addSlider () {
//   $('.podcast-slider').slick({
//     dots: true,
//     infinite: false,
//     slidesToShow: 1,
//     adaptiveHeight: true
//   })
// }

// function removeSlider () {
//   $('.slick-initialized').slick('unslick')
// }

// function setSliderPosition () {
//   $('.podcast-slider').slick('setPosition')
// }

// function initSlider () {
//   addSlider()

//   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//     setSliderPosition()
//   })
// }

// function checkSlider () {
//   let arr = []
//   $('.slick-initialized').each(function (key, item) {
//     console.log(this.id)
//     arr.push(this)
//   })
//   console.log(arr)
// }

// function changeSlider () {
//   $('.podcast-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//     console.log(nextSlide)
//   })
// }

// $(document).ready(function () {
//   initAddPodcast()
//   initAudioSplit()
//   initUploadData()
//   initSlider()
//   changeSlider()
// })
