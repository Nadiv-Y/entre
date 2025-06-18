// Exercise no 1

function bigToSmall(num1, num2, num3) {
    if (num1 > num2 && num2 > num3) {
        return `The biggest number is ${num1}, then ${num2} and tha smallest is ${num3}`
    }
    if (num1 > num3 && num3 > num2) {
        return `The biggest number is ${num1}, then ${num3} and tha smallest is ${num1}`
    }
    if (num2 > num1 && num1 > num3) {
        return `The biggest number is ${num2}, then ${num1} and tha smallest is ${num3}`
    }
    if (num2 > num3 && num3 > num1) {
        return `The biggest number is ${num2}, then ${num3} and tha smallest is ${num1}`
    }
    if (num3 > num1 && num1 > num2) {
        return `The biggest number is ${num3}, then ${num1} and tha smallest is ${num3}`
    }
    if (num3 > num2 && num2 > num1) {
        return `The biggest number is ${num3}, then ${num2} and tha smallest is ${num1}`
    }
}

console.log(bigToSmall(2, 3, 1))


// Exercise no 2

function grades(score) {
    switch (true) {
        case score >= 0 && score < 55:
            console.log('בלתי מספיק')
            break;

        case score > 55 && score < 64:
            console.log('מספיק')
            break;

        case score > 65 && score < 74:
            console.log('כמעט טוב')
            break;

        case score > 75 && score < 84:
            console.log('טוב')
            break;

        case score > 85 && score < 94:
            console.log('טוב מאוד')
            break;

        case score > 95 && score <= 100:
            console.log('מצוין')
            break;


        default:
            console.log('מספר שגוי')
            break;
    }
}

grades(100)



// Exercise no 3

function solveEquations(a, b, c, d, e, f) {

    const x = ((c * e) - (b * f)) / ((a * e) - (b * d))
    const y = ((a * f) - (c * d)) / ((a * e) - (b * d))
    console.log(x);
    console.log(y);
    
    if ((a * e) - (b * d) == 0){
        return `Equation has no solution`
    } else {
        return `x = ${x}, y = ${y}` 
    }


}

console.log(solveEquations(1, 1, 3, 3, 5, 7))



// Exercise no 4

function leapYear(year) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        return `Leap Year`
    } else {
        return `Not Leap Year`
    }  
}

console.log(leapYear(2000))


// Exercise no 5

function februaryDaysCount(year, month) {
    const isLeapYear = leapYear(year);
    const monthNames = [
        "", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (month === 2) {
        if (isLeapYear === `Leap Year`) {
            return `There are 29 days in the month of ${monthNames[month]}, ${year}.`
        } else {
            return `There are 28 days in the month of ${monthNames[month]}, ${year}.`
        }
    }


    if (month === 4 || month === 6 || month === 9 || month === 11) {
        return `There are 30 days in the month of ${monthNames[month]}, ${year}.`
    } else if (month === 1 || month === 3 || month === 5 && month === 7 || month === 8 || month === 10 || month === 12) {
        return `There are 30 days in the month of ${monthNames[month]}, ${year}.`
    } else {
        return `${month} is not a valid month number.`
    }

}

console.log(februaryDaysCount(2004, 2))