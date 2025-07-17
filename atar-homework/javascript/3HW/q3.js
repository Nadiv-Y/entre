// question 1

function posNeg(val){
    if(val < 0){
        return "Negative";
    }
    else if(val == 0){
        return "Zero";
    }
    else
        return "Positive";
}

// question 2

function increase(num1, num2, num3){
    if(num3 > num2 && num2 > num1){
        return "Increasing..."
    }
    else 
    return
}

// question 3 
function max(num1, num2, num3){
    if(num1 >= num2){
        if(num1 >= num3){
            return num1
        }
        else{
            return num3;
        }
    }
    else if(num2 >= num3){
        return num2;
    }
    else {
        return num3;
    }
}

// question 4

function digits(num){
    switch (true) {
        case num >= 1000:
            return 4;
        case num >= 100:
            return 3;
        case num >= 10:
            return 2;
        default:
            return 1;
    }
}

// question 5
const LEVEL_ONE_SALARY = 23000;
const LEVEL_TWO_SALARY = 2 * LEVEL_ONE_SALARY;
const LEVEL_THREE_SALARY = LEVEL_TWO_SALARY + 74000;
const LEVEL_FOUR_SALARY = LEVEL_THREE_SALARY + 100000;

function tax(name, salary){
    let tax;
    switch (true) {
        case salary <= LEVEL_ONE_SALARY:
            return (name + "  will pay a tax of " + (salary * 0.1) + " Shekels");
        case salary <= LEVEL_TWO_SALARY:
            return (name + "  will pay a tax of " + (LEVEL_ONE_SALARY * 0.1 + (salary - LEVEL_ONE_SALARY) * 0.2) + " Shekels");
        case salary <= LEVEL_THREE_SALARY:
            return (name + "  will pay a tax of " + ((LEVEL_ONE_SALARY * 0.1 + LEVEL_ONE_SALARY * 0.2 + ((salary - LEVEL_TWO_SALARY) * 0.3))) + " Shekels"); 
        case salary <= LEVEL_FOUR_SALARY:
            return (name + "  will pay a tax of " + (LEVEL_ONE_SALARY * 0.1 + LEVEL_ONE_SALARY * 0.2 + (74000 * 0.3) + ((salary - LEVEL_THREE_SALARY) * 0.4)) + " Shekels"); 
        default:
            console.log(LEVEL_FOUR_SALARY);
            return (name + "  will pay a tax of " + (LEVEL_ONE_SALARY * 0.1 + LEVEL_ONE_SALARY * 0.2 + (74000 * 0.3) + (100000 * 0.4) + (salary - LEVEL_FOUR_SALARY) * 0.5 ) + " Shekels");
    }
    
}

console.log(tax("david", 275000));
