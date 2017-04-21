(function ($) {
  'use strict'

  var options = {
    'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
    'btn-success': '<i class="fa fa-check"></i>',
    'btn-error': '<i class="fa fa-remove"></i>',
    'msg-success': 'All Good! Redirecting...',
    'msg-error': 'Wrong login credentials!',
    'useAJAX': true
  }

  $('#login-form').validate({
    rules: {
      lg_username: 'required',
      lg_password: 'required'
    },
    errorClass: 'form-invalid'
  })

  // Form Submission
  $('#login-form').submit(function () {
    removeLoading($(this))

    if (options['useAJAX'] === true) {
      // Dummy AJAX request (Replace this with your AJAX code)
      // If you don't want to use AJAX, remove this
      // dummy_submit_form($(this))

      // Cancel the normal submission.
      // If you don't want to use AJAX, remove this
      return false
    }
  })

  // Loading
  // ----------------------------------------------
  function removeLoading ($form) {
    $form.find('[type=submit]').removeClass('error success')
    $form.find('.login-form-main-message').removeClass('show error success').html('')
  }

  function formLoading ($form) {
    $form.find('[type=submit]').addClass('clicked').html(options['btn-loading'])
  }

  function formSuccess ($form) {
    $form.find('[type=submit]').addClass('success').html(options['btn-success'])
    $form.find('.login-form-main-message').addClass('show success').html(options['msg-success'])
  }

  function formFailed ($form) {
    $form.find('[type=submit]').addClass('error').html(options['btn-error'])
    $form.find('.login-form-main-message').addClass('show error').html(options['msg-error'])
  }

  // function dummy_submit_form ($form) {
  //   if ($form.valid()) {
  //     form_loading($form)

  //     setTimeout(function () {
  //       form_success($form)
  //     }, 2000)
  //   }
  // }
})(jQuery)
