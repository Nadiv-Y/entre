// question 1
function rising(num1, num2, num3) {
    if (num1 <= num2 && num1 <= num3) {
        if (num2 <= num3)
            return num1 + "," + num2 + "," + num3;
        else {
            return num1 + "," + num3 + "," + num2;
        }
    }
    else if (num2 <= num1 && num2 <= num3) {
        if (num1 <= num3)
            return num2 + "," + num1 + "," + num3;
        else {
            return num2 + "," + num3 + "," + num1;
        }
    }
    else if (num3 <= num1 && num3 <= num2) {
        if (num1 <= num2)
            return num3 + "," + num1 + "," + num2;
        else {
            return num3 + "," + num2 + "," + num1;
        }
    }
}

// option 2

function rising2(num1, num2, num3) {
    let temp = num1;
    if (num1 >= num2) {
        num1 = num2;
        num2 = temp;
    }
    if (num2 >= num3) {
        temp = num2;
        num2 = num3;
        num3 = temp;
        if (num1 >= num2) {
            temp = num1;
            num1 = num2;
            num2 = temp;
        }
    }
    return num1 + "," + num2 + "," + num3;
}


// question 2
function evaluate(grade) {
    switch (true) {
        case grade < 55:
            return "Not enough";
        case grade <= 64:
            return "Enough";
        case grade <= 74:
            return "Almost good";
        case grade <= 84:
            return "Good";
        case grade <= 94:
            return "Very good";
        default:
            return "Excellent";
    }
}

// question 3

function xy(a, b, c, d, e, f){
    if((a * e - b * d) == 0){
        return "Equation has no solution"
    }

    let x = (c * e - b * f)/(a * e - b * d);
    let y = (a * f - c * d)/(a * e - b * d);

    return "x = " + x + "," + " y = " + y;
}

// question 4
console.log(xy(1, 2, 3, 4, 5, 6));

function leapYear(year){
    if(year % 4 == 0){
        if(year % 100 == 0 && year % 400 != 0){
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

// question 5
function daysInMonth(year, month){
    if(month == 2){
        if(leapYear(year) == true){
            return 29;
        }
        else{
            return 28;
        }
    }
    if(month == 4 || month == 6 || month == 9 || month == 11)
        return 30;
    else {
        return 31;
    }
}

console.log(daysInMonth(2000, 1));

