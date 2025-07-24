//JS_HomeWork/code_p15-ex6.js
/* Task:
קלוט מספר, מובטח כי הוא בן ארבע ספרות לפחות. מצא מה היא ספרתו השנייה מימין

Input a number (guaranteed to be at least four digits). Find the second digit from the right.
*/

//Solution:
let num = 15872; // number greater than 1000

let strNum = num.toString(); // convert number to string
let digits = strNum.length; // count how many digits

let secondFromRight = strNum[digits - 2]; // get the second digit from the right

// Output
console.log("The second digit from the right is", secondFromRight); // Output: 7
