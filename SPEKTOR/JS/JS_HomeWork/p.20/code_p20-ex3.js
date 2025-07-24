//JS_HomeWork/p.20/code_p20-ex3.js
/* Task:
 במערכת המשוואות הבאה A עד F הם מקדמים ו-x ו-y הם נעלמים:
A × x + B × y = C
D × x + E × y = F

ניתן לחשב את x ואת y ע"י נוסחאות העזר הבאות:

x = (C × E – B × F) / (A × E – B × D)

y = (A × F – C × D) / (A × E – B × D)

קלוט את המקדמים A עד F והצג את x ואת y לפי נוסחאות העזר.
המנע מחלוקה ב-0 בנוסחאות העזר!
אם המכנה 0, אין פתרון. במקרה כזה הצג "Equation has no solution".

*/

//Solution:
// Step 1: Declare the known coefficients A to F
let A = 2;
let B = 3;
let C = 8;
let D = 4; 
let E = 5;
let F = 11;
console.log(`Coefficients: \nA=${A}, \nB=${B}, \nC=${C}, \nD=${D}, \nE=${E}, \nF=${F}`);

// Step 2: Calculate the denominator (common for both formulas)
let denominator = (A * E - B * D);
// Step 3: Check if denominator is 0 to avoid division by zero
if (denominator === 0) {
  console.log("Equation has no solution");
} else {
  // Step 4: Use the provided formulas to compute x and y
  let x = (C * E - B * F) / denominator;
  let y = (A * F - C * D) / denominator;

  // Step 5: Display the results
    console.log("Calculated values:");
    console.log(`Solution: x = ${x}, y = ${y}`);
}





