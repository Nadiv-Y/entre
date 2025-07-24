//JS_HomeWork/code_p15-ex5.js
/* Task:
קלוט מספר, מובטח כי הוא בן ארבע ספרות לפחות. מצא מה היא ספרתו הימנית ביותר

Input a number (guaranteed to be at least four digits). Find the rightmost digit of the number.
*/

//Solution:
let num = 15872; // number greater than 1000
let strNum = num.toString(); // convert number to string
let digits = strNum.length; // count how many digits

let lastDigit = strNum[digits - 1]; // get the last digit

// Output
console.log("The last digit is", lastDigit); // Last digit: 2
