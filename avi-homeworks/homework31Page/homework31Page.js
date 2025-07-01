console.log("=== Question 2 ===");

function printRange(N1, N2) {
    let start;
    let end;

    if (N1 < N2) {
        start = N1;
        end = N2;
    } else {
        start = N2;
        end = N1;
    }

    for (let i = start; i <= end; i++) {
        console.log(i);
    }

}

printRange(20, 25);
printRange(45, 40);

console.log("=== Question 3 ===");

function Factorial(N) {
    let result = 1;

    for (let i = 1; i <= N; i++) {
        result *= i;
    }

    console.log(result);
}


Factorial(3);
Factorial(5);

console.log("=== Question 4 ===");

function printDivisibleByThree(N) {

    for (let i = 1; i <= N; i++) {
        if (i % 3 === 0) {
            console.log(i);
        }
    }
}

printDivisibleByThree(9);
printDivisibleByThree(18);

console.log("=== Question 5 ===");

let sum = 0;

for (let i = 1; i <= 99; i++) {

    let number = i;

    if (i % 3 === 0) {
        sum = sum + number;
    }
}

console.log("Sum of every third number:", sum);