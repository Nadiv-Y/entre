console.log($(".header").text());

console.log($('#header-1').text() + ' full stack');

$('p').text($('#header-1').text())

const headers = $(".header");

for (const header of headers) {
  console.log($(header).text());
}

$('div').hide()
$('div').show()
