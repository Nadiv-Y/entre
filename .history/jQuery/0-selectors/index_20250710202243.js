console.log($(".header").text());

console.log($('#header-1').text() + 'full stack');

const headers = $(".header");

for (const header of headers) {
  console.log($(header).text());
}
