// Exercise no 1 

function growing(num1, num2){
    if(num2 > num1){
        return `Growing...`
    }
}  

console.log(growing(1, 2))


// Exercise no 2

function biggerNum(num1, num2){
    if(num1 < num2){
        return num2;
    } else if (num1 > num2){
        return num1;
    } else {
        return num1;
    }
}

console.log(biggerNum(3, 2))


// Exercise no 3

function evenOrOdd(num){
    if(num % 2 === 0){
        return `Even`
    }
    if(num % 2 === 1){
        return `Odd`
    }
}

console.log(evenOrOdd(12))


// Exercise no 4 ?

function isRemaining(num1, num2){
    if(num1 % num2 === 0){
        console.log(`Yes`) 
    } else if (num1 % num2 === 1){
        console.log(`No`) 
    }
    if(num2 % num1 === 0){
        console.log(`Yes`) 
    } else if (num2 % num1 === 1){
        console.log(`No`) 
    }
}

isRemaining(1, 2)


// Exercise no 5

function bigThenSmallNum(num1, num2){
    if(num1 < num2){
        console.log(num1)
        console.log(num2)
    } else if(num1 > num2){
        console.log(num2)
        console.log(num1)
    }
}

bigThenSmallNum(6, 4);


// Exercise no 6

function salaryRaise(name, salary){
    const bigRaise = 0.1;
    const smallRaise = 0.05;
    const salaryBanchmark = 6000;
    if(salary + (salary * bigRaise) < salaryBanchmark){
        const salaryAfterRaise = salary + (salary * bigRaise);
        return `${name} salary is ${salaryAfterRaise}`
    }
    if(salary + (salary * bigRaise) > salaryBanchmark){
        const salaryAfterRaise = salary + (salary * smallRaise);
        return `${name} salary is ${salaryAfterRaise}`
    }
}

console.log(salaryRaise('Dolev', 5500))