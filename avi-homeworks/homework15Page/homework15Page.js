console.log("=== Question 1 ===");

function average(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

let result = average(10, 135, 35);
console.log("Average:", result);

console.log("=== Question 2 ===");

function area(length, width) {
    return length * width;
}

function perimeter(length, width) {
    return 2 * (length + width);
}

let areaResult = area(10, 20);
let perimeterResult = perimeter(10, 20);

console.log("Area:", areaResult);
console.log("Perimeter:", perimeterResult);

console.log("=== Question 3 ===");

function capacity(diameter, depth) {
    let radius = diameter / 2;
    let baseArea = 3.14 * radius * radius;
    return baseArea * depth;
}

let capacityResult = capacity(10, 20);
console.log("Capacity:", capacityResult);
console.log("=== Question 4 ===");

function movieLength(minutesTotal) {
    let minutes = minutesTotal % 60;
    let hours = (minutesTotal - minutes) / 60;
    return hours + " hour(s) and " + minutes + " minute(s)";
}

let movieDuration = movieLength(125);
console.log("Movie length:", movieDuration);

console.log("=== Question 5 ===");

function lastDigit(num) {
    return num % 10;
}

let digit = lastDigit(4545);
console.log("Last digit is:", digit);

console.log("=== Question 6 ===");

function secondRightDigit(num) {
    return (num % 100 - num % 10) / 10;
}

let secondDigit = secondRightDigit(8728);
console.log("Second digit from the right is:", secondDigit);

console.log("=== Question 7 ===");

function getHundredsDigit(number) {
    return (number - number % 100) / 100;
}

let hundredsDigit = getHundredsDigit(631);
console.log("Hundreds digit:", hundredsDigit);

console.log("=== Question 8 ===");

function sumDigits(number) {
    let tens = (number - number % 10) / 10;
    let units = number % 10;
    return tens + units;
}

let digitSum = sumDigits(46);
console.log("Sum of digits:", digitSum);

console.log("=== Question 9 ===");

function reverseTwoDigitNumber(num) {
    let ones = num % 10;
    let tens = (num - ones) / 10;
    return ones * 10 + tens;
}

let reversedNumber = reverseTwoDigitNumber(23);
console.log("Reversed number:", reversedNumber);
console.log("=== Question 10 ===");

function nextEvenInteger(x) {
    let integer = x - x % 1;
    if ((integer + 1) % 2 === 0) {
        return integer + 1;
    } else {
        return integer + 2;
    }
}

let result10 = nextEvenInteger(4.1);
console.log("Next even integer:", result10);