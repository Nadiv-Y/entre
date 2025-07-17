// question 1

function growing(num1, num2){
    if(num2 > num1)
        return "Growing..."
}

// question 2

function bigger(num1, num2){
    return num1 <= num2 ? num2 : num1;
}

// question 3

function oddEven(num){
    return num % 2 == 0 ? "Even" : "Odd";
}

// question 4

function dividedBy(num1, num2){
    if((num1 % num2) == 0)
        return num1 + " is divided by " + num2;

    if((num2 % num1) == 0){
        return num2 + " is divided by " + num1;
    }  
}

// question 5

function series(num1, num2){
    if(num1 < num2){
        return num1 + " , " + num2;
    }
    else{
        return num2 + " , " + num1;
    }
}

// question 6

const MAX_SALARY = 6000;
const MAX_RAISE = 0.1;
const MIN_RAISE = 0.05;

function promo(name, salary){
    if((salary + 0.1 * salary) <= MAX_SALARY){
        return name + "'s new salary is " + (salary + MAX_RAISE * salary);
    }
    else{
        return name + "'s new salary is " + (salary + MIN_RAISE * salary);
    }
}

// let salary = 6000;

// salary = salary + 0.1 * salary;

// console.log(salary);

// console.log(promo("yossi", 3000));
