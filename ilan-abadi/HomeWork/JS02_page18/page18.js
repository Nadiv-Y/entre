// programming-intro page 18
// 1.
function posiOrNegaOrZero(num) {
    switch (true) {
        case num < 0:
            console.log("Negative");
            break;
    
        case num == 0:
            console.log("Zero");
            break;
    
        default:
            console.log("Positive");
            break;
    }
}

// posiOrNegaOrZero(12)
// posiOrNegaOrZero(-12)
// posiOrNegaOrZero(0)

// ==========================================


// 2.
function isItIncreasing(num1, num2, num3) {
    switch (true) {
        case (num2 > num1) && (num3 > num2):
            console.log("increasing...");
            break;
    
        default:
            console.log("");
            break;
    }
}

// isItIncreasing(4, -1, 80)
// isItIncreasing(-1, 4, 80)
// isItIncreasing(-1, 80, 4)


// ==========================================


// 3.
function theLargestIs(num1, num2, num3) {
    switch (true) {
        case (num1 >= num2) && (num1 >= num3):
            console.log(num1);
            break;
    
        case (num2 >= num1) && (num2 >= num3):
            console.log(num2);
            break;
    
        default:
            console.log(num3);
            break;
    }
}
// theLargestIs(56, 57, 1231)
// theLargestIs(-215, -215, -260)


// ==========================================


// 4.
function howManyDigs(number) {
    switch (true) {
        case number / 1000 > 1:
            digNum = 4
            break;
    
        case number / 100 > 1:
            digNum = 3
            break;
    
        case number / 10 > 1:
            digNum = 2
            break;
    
        default:
            digNum = 1
            break;
    }
    console.log("The number " + number + " has " + digNum + " digits.");
    
}

// howManyDigs(6892)


// ==========================================


// 5.
function payForIRS(SelfEmployedName, income) {
    switch (true) {
        case income <= 23000:
            tax = income * 0.1
            break;
    
        case income <= 46000:
            tax = (income - 23000) * 0.2 + 2300
            break;
    
        case income <= 120000:
            tax = (income - 46000) * 0.3 + 6900
            break;
    
        case income <= 220000:
            tax = (income - 120000) * 0.4 + 29100
            break;
    
        default:
            tax = (income - 220000) * 0.5 + 169100
            break;
    }
    console.log(SelfEmployedName + " has to pay the I.R.S " + tax + " NIS.");
    
}

// payForIRS("Moshe", 9000)