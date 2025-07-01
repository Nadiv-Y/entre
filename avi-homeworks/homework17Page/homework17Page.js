console.log("=== Question 1 ===");

function checkGrowing(n1, n2) {
    if (n2 > n1) {
        console.log("Growing...");
    }
}

checkGrowing(10, 13);
checkGrowing(10, 5);

console.log("=== Question 2 ===");

function checkBigger(n1, n2) {
    if (n1 > n2) {
        console.log(n1);
    } else if ((n2 > n1)) {
        console.log(n2);
    } else {
        console.log(n1);
    }
}

checkBigger(14, 13);
checkBigger(10, 15);
checkBigger(10, 10);

console.log("=== Question 3 ===");

function checkEvenOrOdd(n) {
    if (n % 2 === 0) {
        console.log("Even");
    } else {
        console.log("Odd");
    }
}

checkEvenOrOdd(10);
checkEvenOrOdd(11);

console.log("=== Question 4 ===");

function checkDivision(a, b) {
    if (a % b === 0) {
        console.log("First divides by second without remainder");
    } else {
        console.log("First does NOT divide by second without remainder");
    }

    if (b % a === 0) {
        console.log("Second divides by first without remainder");
    } else {
        console.log("Second does NOT divide by first without remainder");
    }
    console.log("---------------------");
}


checkDivision(12, 4);
checkDivision(5, 10);
checkDivision(7, 3);
checkDivision(6, 6);

console.log("=== Question 5 ===");

function checkBigger(n1, n2) {
    if (n1 > n2) {
        console.log(n2, n1);
    } else if ((n2 > n1)) {
        console.log(n1, n2);
    } else {
        console.log(n1, n2);
    }
}

checkBigger(14, 13);
checkBigger(10, 15);
checkBigger(10, 10);

console.log("=== Question 6 ===");

function calculateUpdatedSalary(name, currentSalary) {
    let newSalary;

    if (currentSalary + currentSalary * 0.1 <= 6000) {
        newSalary = currentSalary * 1.1;
    } else {
        newSalary = currentSalary * 1.05;
    }

    console.log("Employee:", name, "| Updated salary:", newSalary);

}


calculateUpdatedSalary("Yossi", 5500);
calculateUpdatedSalary("Dana", 5000);