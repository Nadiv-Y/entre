// JS_HomeWork/code_p37-ex7.js
/* Task:
7. קלוט עשרה שלמים. הצג את כל השלמים בין כל זוג שלמים שנקלטו.
    למשל:
קלט – 8, 8, 12, 9 
פלט – 8, 9, 10, 11, 12, 11, 10, 9, 8, 9

Input ten integers. Display all the integers between each pair of entered numbers.

Example:
Input → 9, 12, 8, 8...
Output → 9, 10, 11, 12, 11, 10, 9, 8, 8...

*/

//Solution:
let totalNumbers = 10;
let numbers = [];

// Step 1: Generate and store 10 random numbers between 0 and 9
for (let number = 1; number <= totalNumbers; number++) {
    let randomNumber = Math.floor(Math.random() * 10); // creates a number from 0 to 9
    console.log(`Number ${number}: ${randomNumber}`);  // show the generated number
    numbers.push(randomNumber); // save it to the array
}

console.log("\nNumbers between each pair:\n");

// Step 2: Go through each pair (number[i], number[i+1])
for (let i = 0; i < numbers.length - 1; i++) {
    let start = numbers[i];
    let end = numbers[i + 1];
    console.log(`Between ${start} and ${end}:`);

    // Step 3a: If first is smaller, count up
    if (start < end) {
        for (let j = start; j < end; j++) {
            console.log(j);
        }
    }
    // Step 3b: If first is larger, count down
    else if (start > end) {
        for (let j = start; j > end; j--) {
            console.log(j);
        }
    }
    // Step 3c: If both numbers are the same
    else {
        console.log(start); // or end — same result
    }
}

// Step 4: Display the last number
console.log(`Last number: ${numbers[numbers.length - 1]}`);

/* Code Explanation:
1. The code initializes an array to hold 10 random integers between 0 and 9.
2. It generates these numbers using a loop and stores them in the array while printing each number.
3. It then iterates through each pair of consecutive numbers in the array.
4. For each pair, it checks if the first number is smaller, larger, or equal to the second number.
5. If the first number is smaller, it counts up from the first to the second number, printing each integer.
6. If the first number is larger, it counts down from the first to the second number, printing each integer.
7. If both numbers are equal, it simply prints that number.
8. Finally, it prints the last number in the array.
This approach ensures that all integers between each pair of numbers are displayed correctly, regardless of their order
or equality.
*/  