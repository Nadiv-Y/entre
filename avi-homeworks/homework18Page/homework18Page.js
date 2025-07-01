console.log("=== Question 1 ===");

function checkValue(val) {
    if (val < 0) {
        console.log("Negative");
    } else {
        if (val === 0) {
            console.log("Zero");
        } else {
            console.log("Positive");
        }
    }
}

checkValue(-3);
checkValue(0);
checkValue(5);

console.log("=== Question 2 ===");

function checkIncreasing(n1, n2, n3) {
    if (n1 >= n2) {
        console.log("Not increasing");
    } else {
        if (n3 > n2) {
            console.log("Increasing...");
        } else {
            console.log("Not increasing");
        }
    }
}

checkIncreasing(12, 4, 32);
checkIncreasing(4, 12, 32);
checkIncreasing(4, 12, 10);

console.log("=== Question 3 ===");

function checkMax(n1, n2, n3) {
    if (n1 >= n2) {
        if (n1 >= n3) {
            console.log(n1);
        } else {
            console.log(n3);
        }
    } else {
        if (n2 >= n3) {
            console.log(n2);
        } else {
            console.log(n3);
        }
    }
}

checkMax(4, 12, 32);
checkMax(44, 12, 3);
checkMax(20, 20, 20);
checkMax(5, 50, 50);


console.log("=== Question 4 ===");

function checkDigits(num) {
    if (num < 10) {
        console.log("Number has 1 digit");
    } else {
        if (num < 100) {
            console.log("Number has 2 digits");
        } else {
            if (num < 1000) {
                console.log("Number has 3 digits");
            } else {
                console.log("Number has 4 digits");
            }
        }
    }
}

checkDigits(7);
checkDigits(85);
checkDigits(423);
checkDigits(9999);

console.log("=== Question 5 ===");


function calculateTax(salary) {
    let tax = 0;

    if (salary <= 23000) {
        tax = salary * 0.1;
    } else {
        tax = 23000 * 0.1;

        if (salary <= 46000) {
            tax = tax + (salary - 23000) * 0.2;
        } else {
            tax = tax + (46000 - 23000) * 0.2;

            if (salary <= 74000) {
                tax = tax + (salary - 46000) * 0.3;
            } else {
                tax = tax + (74000 - 46000) * 0.3;

                if (salary <= 100000) {
                    tax = tax + (salary - 74000) * 0.4;
                } else {
                    tax = tax + (100000 - 74000) * 0.4;
                    tax = tax + (salary - 100000) * 0.5;
                }
            }
        }
    }

    return tax;
}

console.log("Avi:", calculateTax(23000));
console.log("Yossi:", calculateTax(25000));
console.log("Sarah:", calculateTax(73000));
console.log("Racheli:", calculateTax(96930));
console.log("Chani:", calculateTax(100020));