//JS_HomeWork/code_p15-ex7.js
/* Task:
קלוט נתון תלת ספרתי והדפס את ספרת המאות (מובטח כי אינה 0).

Input a three-digit number (guaranteed that the hundreds digit is not 0), and print the hundreds digit.
*/

//Solution:
let num = 569; // number greater than 100

let strNum = num.toString(); //convert number to string

let hundreds = strNum[0]; //get the first digit from the left

// Output
console.log("The hundreds digit is: " + hundreds); // prints the hundreds digit