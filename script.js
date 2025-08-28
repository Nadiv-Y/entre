// Question 1

function sumAndAvg(val1, val2, val3) {
  const sum = val1 + val2 + val3;
  const avg = sum / 3;
  return `The sum is ${sum} and the average is ${avg}`;
}
const results = sumAndAvg(5, 10, 15);
console.log(results);

// ======================================================

// Question 2

function rectangleRoomInfo(length, width) {
  const area = length * width;
  const perimeter = (length + width) * 2;
  return `The area is ${area} and the perimeter is ${perimeter}`;
}

const results2 = rectangleRoomInfo(5, 10);
console.log(results2);

// ======================================================

// Question 3

function potCapacity(diameter, depth) {
  const radius = diameter / 2;
  const pi = 3.14;
  const capacity = pi * radius ** 2 * depth;
  const toLitter = capacity / 1000;
  return `The Pot's capacity is ${toLitter} liters`;
}

const results3 = potCapacity(10, 10);
console.log(results3);

// ======================================================

// Question 4

function minutes_to_hours(minutes) {
  const remainingMinutes = minutes % 60;
  const hours = Math.floor(minutes / 60);
  return `The movie's duration is ${hours} hours and ${remainingMinutes} minutes.`;
}

const results4 = minutes_to_hours(189);
console.log(results4);

// ======================================================

// Question 5

function rightMostDigit(number) {
  const rightMost = number % 10;
  return `The rightmost digit of ${number} is ${rightMost}.`;
}

const results5 = rightMostDigit(12345);
console.log(results5);

// ======================================================

// Question 6

function secondRightMostDigit(number) {
  const secondRightMost = Math.floor(number / 10) % 10;
  return `The second rightmost digit of ${number} is ${secondRightMost}.`;
}

const result6 = secondRightMostDigit(12345);
console.log(result6);

// =======================================================

// Question 7

function theHundredthDigit(number) {
  const hundreds = Math.floor(number / 100);
  return hundreds;
}

const result7 = theHundredthDigit(567);
console.log(result7);

// =======================================================

// Question 8

function sumOfDig(number) {
  const res = (number - (number % 10)) / 10 + (number % 10);
  return res;
}

const result8 = sumOfDig(56);
console.log(result8);

// =======================================================

// Question 9

function newNumber(number) {
  if (number < 10 || number > 99) {
    return "Please enter a two-digit number.";
  }

  const reverseNumber = (num) =>
    parseInt(num.toString().split("").reverse().join(""));
  return reverseNumber(number);
}

const result9 = newNumber(12);
console.log(result9);

// =======================================================

// Question 10

function wholeEvenClosestNumber(num) {
  const roundUp = Math.ceil(num);

  if (roundUp % 2 === 0) {
    return roundUp + 2;
  } else {
    return roundUp + 1;
  }
}

console.log(wholeEvenClosestNumber(5.5));
console.log(wholeEvenClosestNumber(67.3));
console.log(wholeEvenClosestNumber(100.5));
console.log(wholeEvenClosestNumber(9.5));
console.log(wholeEvenClosestNumber(8.5));
console.log(wholeEvenClosestNumber(9.5));
console.log(wholeEvenClosestNumber(44.5));
