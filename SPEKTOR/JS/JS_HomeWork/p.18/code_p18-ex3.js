//JS_HomeWork/p.18/code_p18-ex3.js
/* Task:
 Input three values and display the greatest one (if there is a tie, display one of them).
*/

//Solution:
// Step 1: Declare three numbers
let num1 = 10;
let num2 = 14;
let num3 = 7;
console.log("Input numbers:", num1, num2, num3);

// Step 2: Compare the numbers to find the greatest
if (num1 >= num2 && num1 >= num3) {
  // If num1 is greater than or equal to both num2 and num3
  console.log("The greatest number is:", num1);
} else if (num2 >= num1 && num2 >= num3) {
  // If num2 is greater than or equal to both num1 and num3
  console.log("The greatest number is:", num2);
} else {
  // Otherwise, num3 is the greatest (or equal to one of the others)
  console.log("The greatest number is:", num3);
}
