;(function ($) {
  const button = $('#search-button')
  const input = $('#search-input')

  function searchPosts () {
    document.location.href = '/search?query=' + input.val()
  }

  button.click(searchPosts)
  input.keyup(event => {
    if (event.keyCode === 13) {
      searchPosts()
    }
  })
})(jQuery)
