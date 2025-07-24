//  JS_HomeWork/p.18/code_p18-ex2.js
/*Task:
 Input three values. Display "Increasing..." if the second is greater than the first and the third is greater than the second only.
*/

// Solution:
// Declare three numbers
let num1 = 10;
let num2 = 14;
let num3 = 7;

// Check if the second is greater than the first AND the third is greater than the second
if (num1 < num2 && num2 < num3) {
  console.log("Increasing..."); 
}
else {
  console.log("Not increasing...");
}   