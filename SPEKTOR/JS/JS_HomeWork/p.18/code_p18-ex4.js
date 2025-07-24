// JS_HomeWork/p.18/code_p18-ex4.js
/* Task:
Assume the input is an integer between 1 and 9,999. Display the number of its digits.
*/

// Solution:
//STRING.LENGTH WAY
let num = 385;//Inputting a number between 1 and 9999
console.log("Input number:", num);
let numStr = num.toString();//Converting the number to a string to count its digits
let digitCount = numStr.length;// Getting the length of the string (number of digits)
console.log("Number of digits:", digitCount);


/*
//IF STATEMENT WAY
let num = 385; // Example input: a number between 1 and 9999
console.log("Input number:", num);
let digitCount; // This will hold the number of digits

// Check if the number is a 1-digit number
if (num < 10) {
  digitCount = 1;
}
// Check if the number is a 2-digit number
else if (num < 100) {
  digitCount = 2;
}
// Check if the number is a 3-digit number
else if (num < 1000) {
  digitCount = 3;
}
// Otherwise, it must be a 4-digit number
else {
  digitCount = 4;
}

// Output the result
console.log("Number of digits:", digitCount);
*/