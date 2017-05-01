/* global Handlebars */

;(function ($) {
  const button = $('#search-button')
  const input = $('#search-input')
  const postsContainer = $('#posts-container')

  function searchPosts () {
    const query = input.val()

    if (document.location.pathname !== '/posts') {
      // TODO: render search on server. Pass query to request body.
      document.location.href = `/posts`
    }

    $.get(`/api/posts?q=${query}&sort=-eventDate`)
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
  input.keyup(event => {
    if (event.keyCode === 13) {
      searchPosts()
    }
  })
})(jQuery)
