
// Exercise no 1 

function avgAndSum (num1, num2, num3){
    const sum = num1 + num2 + num3;
    const avg = sum / 3;
    return `The sum is ${sum} and the average is ${avg}`
}

const results = avgAndSum(3, 3, 3);

console.log(results);

// Exercise no 2

function rectangularsRoomArea (length, width){
    const area = length * width;
    const perimeter = (length + width) * 2;
    return `The room area is ${area} and its פerimeter is ${perimeter}`;
}

const results2 = rectangularsRoomArea (12, 24);
console.log(results2);


// Exercise no 3

function potCapacity(diameter, depth){
    const radius =  diameter / 2;
    const pi = 3.14;
    const capacity = pi * (radius ** 2) * depth;
    const toLiter = capacity / 1000;
    return `The pot capacity is ${toLiter} liter`;
}

const results3 = potCapacity(10, 10);
console.log(results3);


// Exercise no 4

function minutesToHours(minutes){
    const minutess = minutes % 60;
    const hours = (minutes - minutess) / 60;
    return `The movie length is ${hours} hours and ${minutess} minutes`
}

const results4 = minutesToHours(140);
console.log(results4);


// Exercise no 5

function NumbersPositionfromRight(fourDigitsNum){
    const rightDigit = fourDigitsNum % 10;
    return `The number in right position is ${rightDigit}`;
}


const results5 = NumbersPositionfromRight(4567);
console.log(results5);


// Exercise no 6

function NumbersPosition(fourDigitsNum){
    const twoRightDigits = fourDigitsNum % 100;
    const rightDigit = twoRightDigits % 10;
    const dozens = twoRightDigits - rightDigit;
    const secondDigitFromRight = dozens / 10;
    return `The number in the second position from the right is ${secondDigitFromRight}`;
}


const results6 = NumbersPosition(4567);
console.log(results6);


// Exercise no 7

function hundredNumber(threeDigitNumber){
    const remaining = threeDigitNumber % 100;
    const hundred = threeDigitNumber - remaining;
    const hundredNumber = hundred / 100;
    return `The hundred number is ${hundredNumber}`
}

const results7 = hundredNumber(523);
console.log(results7);


// Exercise no 8

function twoDigitsSum(twoDigitNum){
    const singleNum = twoDigitNum % 10;
    const tensNum = (twoDigitNum % 100 - singleNum) / 10;
    const sum = singleNum + tensNum;
    return `The sum of the number two digits is ${sum}`;
}

const results8 = twoDigitsSum(22);
console.log(results8);


// Exercise no 9

function reverseDigits(number){
    const singleNum = number % 10;
    const tensNum = (number % 100 - singleNum) / 10;
    return `The reverdsed version of ${number} is ${singleNum}${tensNum} `
}

const results9 = reverseDigits(83);
console.log(results9);


// Exercise no 10

function biggerAndEqualNum(number){
    const decimalNum = number % 1;
    const fullNum = number - decimalNum; 
    const remining = (fullNum % 2) + decimalNum; 
    const reminingToEqual = 2 - remining;
    const biggerEqualNum = number + reminingToEqual;
    console.log(biggerEqualNum); 
}

biggerAndEqualNum(8.1);
