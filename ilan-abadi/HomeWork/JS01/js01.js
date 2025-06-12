// programming-intro page 15
// 1.
function sumAndAvgOfThree(num1, num2, num3) {
    sum = num1 + num2 + num3;
    avg = sum / 3
    console.log("The sum of the numbers is", sum,
        "And their average is", avg, ".");
    
}

// console.log(sumAndAvgOfThree(4,12,8));

// ==========================================


// 2.
function roomAreaPerimeter(roomLength, roomWidth) {
    roomArea = roomLength * roomWidth
    roomPerimeter = 2*(roomLength + roomWidth)
    console.log("The room's area is", roomArea, "square meters And its perimeter is",
        roomPerimeter, "meter");
}

// console.log(roomAreaPerimeter(3, 4));

// ==========================================


// 3.
function potCapacity(potDiameter, potDepth) {
    potRadius = potDiameter / 2
    potArea = 3.14 * potRadius * potRadius
    console.log("The pot capacity is", potArea * potDepth, "cubic centimeters");   
}

// console.log(potCapacity(25, 10));

// ==========================================


// 4.
function movieLength(min) {
    movMin = min % 60
    movHour = (min - movMin) / 60
    console.log("Movie's length is", movHour, "hour(s) and", movMin, "minute(s)");
}

// console.log(movieLength(88));

// ==========================================


// 5.
function rightDigit(num) {
    dig = num % 10
    console.log("The rightmost digit is", dig);
}

// console.log(rightDigit(123786));

// ==========================================


// 6.
function secondRightDigit(num) {
    firstDig = num % 10 
    firstTwoDig = num % 100
    secDig = (firstTwoDig - firstDig) / 10 //Here we can use the function from previous question
    console.log("The seconed digit from the right is", secDig);
}

// console.log(secondRightDigit(123786));

// ==========================================



// 7.
function hundredsDigit(num) {
    hDigit = (num - (num % 100)) /100
    console.log("The hundreds digit is", hDigit);
}

// console.log(hundredsDigit(537));

// ==========================================



// 8.
function sumOfDigits(num) {
    // rightDig = num % 10
    // leftDig = (num - rightDig) / 10
    // digitSum = rightDig + leftDig
    digitSum = (num % 10) + ((num - (num % 10)) / 10)
    console.log("The sum of the digits is", digitSum);
}

// console.log(sumOfDigits(93));

// ==========================================



// 9.
function reverseDigits(num) {
    // rightDig = num % 10
    // leftDig = (num - rightDig) / 10
    // rvsDigs = (10 * rightDigit) + leftDig
    rvsDigs = (10 * (num % 10)) + ((num - (num % 10))/10)
    console.log("The new number is", rvsDigs);
}

// console.log(reverseDigits(61));

// ==========================================



// 10.
function nextLargerWhollEven(num) {
    whollNum = num - (num % 1)
    ifOdd = whollNum + 1
    ifEven = whollNum + 2
    whollNumModulo = whollNum % 2
    return whollNumModulo === 0 ? ifEven : ifOdd
}

console.log('The next wholl even number is', nextLargerWhollEven(98.13));





