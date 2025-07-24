console.log($(".header").text());

console.log($('#header-1').text() + ' full stack');

$('p').text($('#header-1').text())

const headers = $(".header");

for (const header of headers) {
  console.log($(header).text());
}

$('div p').hide()
$('div').show()
$('div').css("color", "blue")


$('li:even').css('background-color', 'lightgreen')
$('li:odd').css('background-color', 'lightblue')

$('li:nth-child(3)').css('list-style', 'none')

$('[href="google"]').css("font-size", "30px")