function firstQuestion(num1, num2, num3) {
  let sum = num1 + num2 + num3;
  console.log("Sum: ", sum);
  console.log("Average: ", sum / 3);
}

function secondQuestion(height, width) {
  console.log("Area: ", height * width);
  console.log("perimeter: ", height * 2 + width * 2);
}

function thirdQuestion(height, diameter) {
  const PI = 3.14;
  console.log("Area: ", (diameter / 2) ** 2 * PI * height);
}

function fourthQuestion(movieLength) {
  let minutes = movieLength % 60;
  let hours = (movieLength - minutes) / 60;
  console.log(hours, "hour(s) and ", minutes, "minute(s)");
}

function fifthQuestion(fourDigitNumber) {
  console.log(fourDigitNumber % 10);
}

function sixthQuestion(fourDigitNumber) {
  console.log(((fourDigitNumber % 100) - (fourDigitNumber % 10)) / 10);
}

function seventhQuestion(threeDigitNumber) {
  console.log((threeDigitNumber - (threeDigitNumber % 100)) / 100);
}

function eighthQuestion(twoDigitNumber) {
  digit = twoDigitNumber % 10;
  dDigit = (twoDigitNumber - digit) / 10;
  console.log("Sum: ", digit + dDigit);
}

function ninthQuestion(twoDigitNumber) {
  digit = twoDigitNumber % 10;
  dDigit = (twoDigitNumber - digit) / 10;
  console.log("New number: ", digit * 10 + dDigit);
}

function tenthQuestion(number) {
  digit = number % 10;
  afterDot = number % 1;
  console.log((digit - afterDot) % 2 < 1 ? 2 + number - afterDot : 1 + number - afterDot);
}
