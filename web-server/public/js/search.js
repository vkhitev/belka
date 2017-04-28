/* global Handlebars */

;(function ($) {
  const button = $('#search-button')
  const input = $('#search-input')
  const postsContainer = $('#posts-container')

  function searchPosts () {
    $.get(`/api/posts?q=${input.val()}&sort=-eventDate`)
      .then(posts => {
        if (posts.length > 0) {
          postsContainer.html(Handlebars.templates.posts({ posts }))
        } else {
          postsContainer.html(Handlebars.templates.no_posts({ }))
        }
      })
      .catch(err => {
        console.log(err)
        postsContainer.html(Handlebars.templates.no_posts({ }))
      })
  }

  button.click(searchPosts)
  input.keyup((e) => {
    if (e.keyCode === 13) {
      searchPosts()
    }
  })
})(jQuery)
