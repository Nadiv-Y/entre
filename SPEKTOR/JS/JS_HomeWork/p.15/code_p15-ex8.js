//JS_HomeWork/code_p15-ex8.js
/*Task:
‏קלוט נתון דו ספרתי והדפס את סכום ספרותיו. 
Input a two-digit number and print the sum of its digits.
*/

//Solution:
let num = 47; // number between 10 and 99
let strNum = num.toString(); // convert to string → "47"
let num1 = strNum[0] * 1;// first digit as number → 4
let num2 = strNum[1] * 1;// second digit as number → 7

let sum = num1 + num2;// 4 + 7 = 11

console.log("First digit:", num1); // Output: 4
console.log("Second digit:", num2); // Output: 7    
console.log("Sum of digits:", sum);// Output: 11
