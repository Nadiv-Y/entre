// programming-intro page 17
// 1.
function isItGrowing(num1, num2) {
    if (num2 > num1) {
        return "Growing...";
    }
}

// console.log("Print 1:", isItGrowing(15,7));
// console.log("Print 2:", isItGrowing(7,15));
// console.log("Print 3:", isItGrowing(7,7));


// ==========================================


// 2.
function theLargest(num1, num2) {
    switch (num1 >= num2) {
        case true:
            largest = num1
            break;
        default:
            largest = num2
            break;
    }
    return largest
}

// console.log(theLargest(3, 25));


// ==========================================


// 3.
function oddOrEven(num) {
    let number = num % 2
    switch (number) {
        case 0:
            theNumberIs = "Even"
            break;
    
        default:
            theNumberIs = "Odd"
            break;
    }
    return theNumberIs
}

// console.log(oddOrEven(21));


// ==========================================


// 4.
function isDivWhollNum(num1, num2) {
    div1 = num1 % num2
    div2 = num2 % num1
    switch (div1) {
        case 0:
            res1 = "a wholl number";
            break;
    
        default:
            res1 = "NOT a wholl number";
            break;
    }
    switch (div2) {
        case 0:
            res2 = "a wholl number";
            break;
    
        default:
            res2 = "NOT a wholl number";
            break;
    }
    console.log(num1 + " divided by " + num2 + " is " + res1);
    console.log(num2 + " divided by " + num1 + " is " + res2);
}

// isDivWhollNum(22, 11);


// ==========================================


// 5.
function smallestFirst(num1, num2) {
    switch (true) {
        case num1 < num2:
            console.log(num1 + " " + num2);
            break;

        case num1 > num2:
            console.log(num2 + " " + num1);
            break;
    
        default:
            console.log(num2 + " " + num1);
            break;
    } 
}

// smallestFirst(72, 6)


// ==========================================


// 6.
function programmerNewSalary(programmer, salary) {
    switch (true) {
        case salary * 1.1 <= 6000:
            newSalary = salary * 1.1
            break;
    
        default:
            newSalary = salary * 1.05
            break;
    }
    console.log("Programmer name: " + programmer + " | new salary: " + newSalary + " NIS");
}

// programmerNewSalary("Alex", 5000)
// programmerNewSalary("Boris", 6000)