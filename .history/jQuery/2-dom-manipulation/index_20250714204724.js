function generateBlueGoldStyle() {
  $('.blue-gold').css({ color: 'blue', 'background-color': 'gold' })
}
 
function generateMeasurements() {
  $('#section-1-container').css({ height: '300px', border: '1px solid black' })
}
 
function hideSections() {
  $('.section-1, .section-2, .section-3, .list-revealed').hide()
}
 
function liCounter() {
  if ($('#list').attr('counter')) {
    let counter = parseInt($('#list').attr('counter'))
    $('#list').attr('counter', ++counter)
    return counter
  }
  $('#list').attr('counter', 1)
  return 1
}
 
generateMeasurements()
hideSections()
 
$('#display-1').click(function () {
  $('.section-1').show()
})
 
$('#display-2').click(function () {
  $('.section-2').show()
})
 
$('#display-3').click(function () {
  $('.section-3').show()
})
 
$('#toggle').click(function () {
  if ($('#section-1-container').hasClass('blue-gold')) {
    $('.blue-gold').css({ color: '', 'background-color': '' })
    $('#section-1-container').removeClass('blue-gold')
    $('#section-1-container').html('<p>Removed</p>')
  } else {
    $('#section-1-container').addClass('blue-gold')
    generateBlueGoldStyle()
    $('#section-1-container').html('<p>Hello Container</p>')
  }
})
 
$('#list-creator').click(function () {
  $('body').append(`
    <ul class='section-2' id='list'>
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ul>
    `)
  $('.list-revealed').show()
  $(this).prop('disabled', true)
})
 
$('#li-to-end').click(function () {
  const counter = liCounter()
  $('#list').append(<li>${counter}</li>)
})
 
$('#li-to-top').click(function () {
  const counter = liCounter()
  $('#list').prepend(<li>${counter}</li>)
})
 
$('#li-to-ul-end').click(function () {
  const counter = liCounter()
  $(<li>${counter}</li>).appendTo($('#list'))
})
 
$('#li-to-ul-top').click(function () {
  const counter = liCounter()
  $(<li>${counter}</li>).prependTo($('#list'))
})
 
$('#p-before-list').click(function () {
  const counter = liCounter()
  $('#list').before(<p>p ${counter}</p>)
})
 
$('#p-after-list').click(function () {
  const counter = liCounter()
  $('#list').after(<p>p ${counter}</p>)
})
 
$('#reset').click(function () {
  if (confirm('Are you sure you want to reset?')) {
    $('#list').attr('counter', 0)
  }
})
 
