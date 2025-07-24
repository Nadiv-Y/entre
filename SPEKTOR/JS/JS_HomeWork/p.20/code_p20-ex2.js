//JS_HomeWork/p.20/code_p20-ex2.js
/* Task:
An elementary school principal decided that grades will no longer appear as numeric scores on report cards, but rather as verbal evaluations based on the following key:
• Less than 55 → Insufficient
• 55 to 64 → Sufficient
• 65 to 74 → Almost good
• 75 to 84 → Good
• 85 to 94 → Very good
• 95 and above → Excellent

Input a student's grade and display the appropriate verbal evaluation.
*/

//Solution:
// Step 1: Declare the student's numeric grade
let grade = 87;
console.log("Student's grade:", grade);
// Step 2: Check the grade range and output the appropriate evaluation
if (grade < 55) {
  console.log("Insufficient");

} else if (grade >= 55 && grade <= 64) {
  console.log("Sufficient");

} else if (grade >= 65 && grade <= 74) {
  console.log("Almost good");

} else if (grade >= 75 && grade <= 84) {
  console.log("Good");

} else if (grade >= 85 && grade <= 94) {
  console.log("Very good");

} else if (grade >= 95) {
  console.log("Excellent");
}


