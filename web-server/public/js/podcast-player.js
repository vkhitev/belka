$(document).ready(function () {
  $('.podcast-carousel').carousel({
    interval: false
  })

  $('.podcast-carousel').on('slid.bs.carousel', function () {
    checkitem($(this).attr('id'))
  })

  $('.podcast-carousel').each(function () {
    checkitem($(this).attr('id'))
  })
})

function checkitem (identificator) {
  var $this = $('#' + identificator)

  if ($('#' + identificator + ' .carousel-item:first').hasClass('active')) {
    $this.children('.carousel-control-prev').hide()
    $this.children('.carousel-control-next').show()
  } else if ($('#' + identificator + ' .carousel-item:last').hasClass('active')) {
    $this.children('.carousel-control-next').hide()
    $this.children('.carousel-control-prev').show()
  } else {
    $this.children('.carousel-control-prev').show()
    $this.children('.carousel-control-next').show()
  }
}
