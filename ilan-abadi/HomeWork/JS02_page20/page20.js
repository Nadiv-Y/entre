// programming-intro page 20
// 1.
function orderThreeNumbers(num1, num2, num3) {
    switch (true) {
        case (num1 <= num2) && (num1 <= num3) && (num2 <= num3):
            console.log(num1);
            console.log(num2);
            console.log(num3);
            break;
    
        case (num1 <= num2) && (num1 <= num3) && (num3 <= num2):
            console.log(num1);
            console.log(num3);
            console.log(num2);
            break;
    
        case (num2 <= num1) && (num2 <= num3) && (num1 <= num3):
            console.log(num2);
            console.log(num1);
            console.log(num3);
            break;
    
        case (num2 <= num1) && (num2 <= num3) && (num3 <= num1):
            console.log(num2);
            console.log(num3);
            console.log(num1);
            break;

        case num1 <= num2:
            console.log(num3);
            console.log(num1);
            console.log(num2);
            break;
    
        default:
            console.log(num3);
            console.log(num2);
            console.log(num1);
            break;
    }
}

// orderThreeNumbers(87, -5, 2457)
// orderThreeNumbers(11, 8, 5)


// ==========================================


// 2.
function evaluation(mark) {
    switch (true) {
        case mark < 55:
            evalu = "בלתי מספיק"
            break;
    
        case mark < 64:
            evalu = "מספיק"
            break;
    
        case mark < 74:
            evalu = "כמעט טוב"
            break;
    
        case mark < 84:
            evalu = "טוב"
            break;
    
        case mark < 94:
            evalu = "טוב מאוד"
            break;
    
        default:
            evalu = "מצוין"
            break;
    }
    console.log(evalu);
}

// evaluation(65)


// ==========================================


// 3.
function findXAndY(A, B, C, D, E, F) {
    const x = (C * E - B * F) / (A * E - B * D)
    const y = (A * F - C * D) / (A * E - B * D)
    switch (true) {
        case A * E == B * D:
            console.log("Equation has no solution");
            break;
    
        default:
            console.log("x =", x);
            console.log("y =", y);
            break;
    }
}

// findXAndY(1, 2, 3, 4, 5, 6)
// findXAndY(2, 3, 1, 4, 6, 8)

// ==========================================


// 4.
function isItLeapYear(year) {
    switch (true) {
        case (year % 4 == 0) && (year % 100 !== 0) || (year % 400 == 0):
            yearType ="leap year"
            break;
     
        default:
            yearType ="regular year"
            break;
    }
    return yearType
}
// let year = 2400
// console.log(year + " is a " + isItLeapYear(year));


// ==========================================


// 5.
function dayInMon(year, month) {
    yearType = isItLeapYear(year) //הפונקציה מהשאלה הקודמת
    switch (true) {
        case yearType == "regular year" && month == 2:
            nomberOfDays = 28
            break;
    
        case yearType == "leap year" && month == 2:
            nomberOfDays = 29
            break;
    
        case month == 4 || month == 6 || month == 9 || month == 11:
            nomberOfDays = 30
            break;
    
        default:
            nomberOfDays = 31
            break;
    }
   console.log("There are " + nomberOfDays + " days in month " + month + " in the year " + year);
   
}
// dayInMon(2004, 2)
// dayInMon(2002, 2)
// dayInMon(2002, 4)
// dayInMon(2002, 3)

