//JS_HomeWork/code_p15-ex9.js
/*Task:
‏קלוט שלם בין 10 לבין 99, הפוך את סדר הספרות והצג את המספר החדש. 
Eng: Input an integer between 10 and 99, reverse the digits and display the new number.
*/

//Solution:
let num = 47;// number between 10 and 99
let strNum = num.toString();// convert to string → "47"
let newNum = (strNum[1] + strNum[0]) * 1; // reverse digits: "7" + "4" = "74" → *1 → 74
console.log("Reversed number:", newNum); // Output: 74



// Alternative solution using arithmetic operations
let tens = Math.floor(num / 10); // Get the tens digit: 4
let units = num % 10; // Get the units digit: 7
let reversedNum = units * 10 + tens; // Reverse the digits: 7 * 10 + 4 = 74
console.log("Reversed number using arithmetic:", reversedNum); // Output: 74