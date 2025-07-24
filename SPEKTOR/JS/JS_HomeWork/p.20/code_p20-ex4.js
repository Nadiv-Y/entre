//JS_HomeWork/p.20/code_p20-ex4.js
/* Task:
A leap year is a year divisible by 4 with no remainder, and not divisible by 100, unless it is divisible by 400.

Examples:
2002 ➞ not divisible by 4 ➞ 2002 is a regular year.
2004 ➞ divisible by 4 and not by 100 ➞ 2004 is a leap year.
1900 ➞ divisible by 4 and by 100, but not by 400 ➞ 1900 is a regular year.
2000 ➞ divisible by 4, 100, and 400 ➞ 2000 is a leap year.

Input a year and display whether it is a leap year.
*/

//Solution:
// Step 1: Input a year (you can replace the value or use prompt in browser)
let year = 2004;

// Step 2: Check if the year is divisible by 4 and not divisible by 100,
// OR if it is divisible by 400
if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
  
// If the condition is true, it is a leap year
  console.log(year + " is a leap year.");

} else {
  // Otherwise, it is a regular year
  console.log(year + " is a regular year.");
}
