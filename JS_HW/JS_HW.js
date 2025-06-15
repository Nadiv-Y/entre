/*-------------------Part 1-------------------*/
function sum(num1, num2) {
    return num1 + num2;
}

function power(num, exponent) {
    return num ^ exponent;
}

function Avarage(num1, num2, num3) {
    return (sum(num1,sum(num2,num3))) / 3;
}

function capasityOfTank(diameter, height) {
    return Math.PI * power((diameter / 2), 2) * height;
}

function movieLength(minutes) {
    if (minutes <= 0) {
        return "Movie length must be greater than 0!";
    }

    let hours = minutes / 60;
    hours = hours - (hours % 1);
    let mins = minutes % 60;
    return `${hours} hours and ${mins} minutes`;
}

function firstDigitFromRight(num){
    if((num <= 999) && (num >= -999)){
        return "The number must be with 4 digits at least!";
    }
    return num % 10;
}

function secondDigitFromRight(num) {
    if((num <= 999) && (num >= -999)){
        return "The number must be with 4 digits at least!";
    }
    num = (num % 100) / 10;
    return num - (num % 1);
}

function thirdDigitFromRight(num) {    
    if((num <= 99) && (num >= -99)){
        return "The number must be with 3 digits at least!";
    }
    return (num % 1000) / 100;
}

function sumOfDigits(num){
    if(((num < 10) && (num > -10)) || (num > 100) || (num < -100))
    {
        return "The number must have 2 digits only!"
    }
    let dig = num / 10;
    return sum(dig - (dig % 1),num % 10);
}

function numberReverse (num){
    if(((num < 10) && (num > -10)) || (num > 100) || (num < -100))
    {
        return "The number must have 2 digits only!"
    }
    let leftDigit = num / 10;
    leftDigit = leftDigit - (leftDigit % 1);
    let  rightDigit = num % 10;
    return (rightDigit * 10) + leftDigit;
}

function closestLangerEvenNumber(num){
    num = num - (num % 1);
    if(num % 2 == 1){
        return num + 1;
    }
    else{
        return num + 2;
    }
}

/*-------------------Part 2-------------------*/
function growth(num1, num2) {
    if(num2 > num1) {
        console.log("Growing...");
    }
    else if(num2 < num1) {
        console.log("Declining...");
    }
    else {
        console.log("Stable...");
    }
}

function displayLarger(num1, num2) {
    if(num1 > num2) {
        console.log(num1);
        
    }
    else if(num2 > num1) {
        log.console(num2);
    }
    else {
        console.log(num1);        
    }
}

function isEvenorOdd(num) {
    num = num - (num % 1);
    if(num % 2 == 0) {
        console.log("Even");
    }
    else {
        console.log("Odd");
    }
}

function doesNumberDivideByEachOther(num1, num2) {
    if(num2 % num1 == 0){
        console.log(`${num2} is divisible by ${num1} without a remainder.`);
    }
    else if(num1 % num2 == 0) {
        console.log(`${num1} is divisible by ${num2} without a remainder.`);
    }
    else {
        console.log("None of the numbers is divisible by the other without a remainder.");
    }
}

function displayDicending(num1, num2) {
    if(num1 > num2) {
        console.log(`${num1} ${num2}`);
    }
    else if(num2 > num1) {
        console.log(`${num2} ${num1}`);
    }
    else {
        console.log(`${num1} ${num2}`);
    }
}

function increaseSalaryForProgrammers(salary) {
    if(salary == 0) {
        return "Salary must be greater than 0!";
    }
    else if(salary < 6000) {
        return salary + (salary * 0.1);
    }
    else if (salary >= 6000) {
        return salary + (salary * 0.05);
    }
}

/*-------------------Part 3-------------------*/
function displayIncreasing(num1, num2, num3) {
    if((num1 < num2) && (num2 < num3)) {
        console.log(`${num1} ${num2} ${num3}`);
    }
    else if((num1 < num3) && (num3 < num2)) {
        console.log(`${num1} ${num3} ${num2}`);
    }
    else if((num2 < num1) && (num1 < num3)) {
        console.log(`${num2} ${num1} ${num3}`);
    }
    else if((num2 < num3) && (num3 < num1)) {
        console.log(`${num2} ${num3} ${num1}`);
    }
    else if((num3 < num1) && (num1 < num2)) {
        console.log(`${num3} ${num1} ${num2}`);
    }
    else {
        console.log(`${num3} ${num2} ${num1}`);
    }
}

function wordInsteadOfGrade(grade) {
    if(grade < 0) {
        return "Grade must be greater than or equal to 0!";
    }
    else if((grade >= 0) && (grade < 55)) {
        return "Not Enough";
    }
    else if((grade >= 55) && (grade <= 64)){
        return "Enough";
    }
    else if((grade >= 65) && (grade <= 74)){
        return "Almost Good";
    }
    else if((grade >= 75) && (grade <= 84)){
        return "Good";
    }
    else if((grade >= 85) && (grade <= 94)){
        return "Very Good";
    }
    else if((grade >= 95) && (grade <= 100)){
        return "Excellent";
    }
    else {
        return "Grade must be less than or equal to 100!";
    }
}

function CalculateXandYfromEquation(A, B, C, D, E, F) {
    if((A * E) - (B * D) == 0) {
        return "The equation has no solution!";
    }
    let x = ((C * E) - (B * F)) / ((A * E) - (B * D));
    let y = ((A * F) - (D * D)) / ((A * E) - (B * D));
    return `x = ${x}, y = ${y}`;
}

function isLeapYear(year) {
    if(year < 0) {
        return "Year must be greater than or equal to 0!";
    }
    if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        return `${year} is a leap year.`;
    }
    else {
        return `${year} is not a leap year.`;
    }
}

function numberOfDaysInMonth(month, year) {
    if(month < 1 || month > 12) {
        return "Month must be between 1 and 12!";
    }
    if(year < 0) {
        return "Year must be greater than or equal to 0!";
    }
    
    if(month == 2) {
        if(isLeapYear(year) == `${year} is a leap year.`) {
            return 29;
        }
        else {
            return 28;
        }
    }
    
    if((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
        return 30;
    }
    
    return 31;
}

/*-------------------Part 4-------------------*/
function checkValueIfPositiveOrNegative(val) {
    if(val < 0) {
        console.log("Negative");
    }
    else if(val > 0) {
        console.log("Positive");
    }
    else {
        console.log("Zero");
    }
}

function checkIfIncreasing (num1, num2, num3) {
    if((num1 < num2) && (num2 < num3)) {
        console.log("Increasing...");
    }
}

function showLargerValue(num1, num2, num3) {
    if((num1 > num2) && (num1 > num3)) {
        console.log(num1);
    }
    else if((num2 > num1) && (num2 > num3)) {
        console.log(num2);
    }
    else if((num3 > num1) && (num3 > num2)) {
        console.log(num3);
    }
    else {
        console.log(num1);
    }
}

function countDigits(num) {
    let count = 0;
    if((num < 1) || (num > 9999)) {
        return "The number must be between 1 and 9999!";
    }
    num = num - (num % 1);
    while(num > 0) {
        num = num / 10;
        count++;
        num = num - (num % 1);
    }
    log.console(`The number has ${count} digits.`);
}

function calculateFeesFromSalary(empley ,salary) {
    let fees = 0;
    if(salary < 0) {
        return "Salary must be greater than or equal to 0!";
    }
    if(salary <= 23000) {
        fees = salary * 0.1;
        if((salary - 23000) < 0) {
            log.console(`The fees for ${empley} is ${fees}.`);
            return;
        }
    }
    else if(salary <= 46000) {
        fees = 2300 + ((salary - 23000) * 0.2);
        if((salary - 46000) < 0) {
            log.console(`The fees for ${empley} is ${fees}.`);
            return;
        }
    }
    else if(salary <= 120000) {
        fees = 2300 + 4600 + ((salary - 46000) * 0.3);
        if((salary - 120000) < 0) {
            log.console(`The fees for ${empley} is ${fees}.`);
            return;
        }
    }
    else if(salary <= 220000) {
        fees = 2300 + 4600 + 22200 + ((salary - 120000) * 0.4);
        if((salary - 220000) < 0) {
            log.console(`The fees for ${empley} is ${fees}.`);
            return;
        }
    }
    else {
        fees = 2300 + 4600 + 22200 + 40000 + ((salary - 220000) * 0.5);
        log.console(`The fees for ${empley} is ${fees}.`);
        return;
    }
}