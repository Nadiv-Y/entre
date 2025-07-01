console.log("=== Question 1 ===");

function sortThree(a, b, c) {
    if (a <= b && a <= c) {
        if (b <= c) {
            console.log(a, b, c);
        } else {
            console.log(a, c, b);
        }
    } else if (b <= a && b <= c) {
        if (a <= c) {
            console.log(b, a, c);
        } else {
            console.log(b, c, a);
        }
    } else {
        if (a <= b) {
            console.log(c, a, b);
        } else {
            console.log(c, b, a);
        }
    }
}

sortThree(12, 5, 8);
sortThree(3, 3, 2);
sortThree(100, 50, 75);

console.log("=== Question 2 ===");

function evaluateGrade(grade) {
    if (grade < 55) {
        console.log("בלתי מספיק");
    } else if (grade < 65) {
        console.log("מספיק");
    } else if (grade < 75) {
        console.log("כמעט טוב");
    } else if (grade < 85) {
        console.log("טוב");
    } else if (grade < 95) {
        console.log("טוב מאוד");
    } else {
        console.log("מצוין");
    }
}


evaluateGrade(50);
evaluateGrade(60);
evaluateGrade(70);
evaluateGrade(80);
evaluateGrade(90);
evaluateGrade(100);

console.log("=== Question 3 ===");

function solveEquations(A, B, C, D, E, F) {
    let denominator = A * E - B * D;

    if (denominator === 0) {
        console.log("Equation has no solution");
    } else {
        let x = (C * E - B * F) / denominator;
        let y = (A * F - C * D) / denominator;
        console.log("x =", x);
        console.log("y =", y);
    }
}

solveEquations(2, 3, 10, 4, 5, 12);
solveEquations(1, 2, 3, 2, 4, 6);
solveEquations(7, 2, 2, 0, 1, 2);


console.log("=== Question 4 ===");

function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        console.log("מעוברת");
    } else {
        console.log("לא מעוברת");
    }
}

isLeapYear(2025);
isLeapYear(2004);
isLeapYear(2000);
isLeapYear(1900);

console.log("=== Question 5 ===");

function daysInMonth(year, month) {
    if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            console.log("פברואר 29 ימים");
        } else {
            console.log("פברואר 28 ימים");
        }
    } else if (
        month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12
    ) {
        console.log("31 ימים");
    } else if (
        month === 4 ||
        month === 6 ||
        month === 9 ||
        month === 11
    ) {
        console.log("30 ימים");
    } else {
        console.log("חודש לא חוקי");
    }
}

daysInMonth(2025, 2);
daysInMonth(2004, 3);
daysInMonth(2000, 6);
daysInMonth(1900, 7);
daysInMonth(2025, 13);