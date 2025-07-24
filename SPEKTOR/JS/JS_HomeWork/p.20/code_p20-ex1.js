//JS_HOMEWORK/P.20/CODE_P20_EX1.JS
/* Task:
Input three values and display them from smallest to largest.
*/

// Solution:
let num1 = 18;
let num2 = 4;
let num3 = 29;
console.log("Input numbers:", num1, num2, num3);

// Step 1: Find the smallest number
let smallest;
if (num1 <= num2 && num1 <= num3) {
  smallest = num1;
} else if (num2 <= num1 && num2 <= num3) {
  smallest = num2;
} else {
  smallest = num3;
}

// Step 2: Find the largest number
let largest;
if (num1 >= num2 && num1 >= num3) {
  largest = num1;
} else if (num2 >= num1 && num2 >= num3) {
  largest = num2;
} else {
  largest = num3;
}

// Step 3: Find the middle number
let middle;
if (
  (num1 !== smallest && num1 !== largest) ||
  (num1 === num2 && num1 !== smallest && num1 !== largest)
) {
  middle = num1;
} else if (
  (num2 !== smallest && num2 !== largest) ||
  (num2 === num3 && num2 !== smallest && num2 !== largest)
) {
  middle = num2;
} else {
  middle = num3;
}

// Step 4: Print the numbers from smallest to largest
console.log("Numbers from smallest to largest:", smallest, middle, largest);


