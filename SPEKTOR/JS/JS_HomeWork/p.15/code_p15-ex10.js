// JS_HomeWork/code_p15-ex10.js
/*Task:
‏קלוט מספר והצג את השלם הזוגי הגדול ממנו וקרוב ביותר אליו. לדוגמא: קלט - 4.1, פלט - 6. 
Eng: Input a number and display the next largest even integer. For example: Input - 4.1, Output - 6.
*/

//Solution:
let num = 4.1; // Input number
let intNum = num - num % 1;// Remove decimal part → 4
let nextEven = (intNum + 2) - intNum % 2; 
console.log(`Next largest even integer: ${nextEven}`); // Output: 6

/*Code Explanation:
1. The code starts with a given number (in this case, 4.1).

2. It removes the decimal part to get the integer value (4).

3. It calculates the next even integer by adding 2 and adjusting based on the original integer's parity (even or odd).
intNum % 2 checks if the number is even or odd:
If intNum % 2 === 0 → even
If intNum % 2 === 1 → odd

intNum + 2 temporarily moves 2 numbers up from the original number.
If intNum = 4 → 4 + 2 = 6
If intNum = 5 → 5 + 2 = 7

Subtracting intNum % 2 from the result adjusts based on whether the number is even or odd:
If intNum is even (% 2 = 0):
(intNum + 2) - 0 = intNum + 2 
Ex: (4 + 2 = 6) - (4 % 2 = 0) = 6

If intNum is odd (% 2 = 1):
(intNum + 2) - 1 = intNum + 1
Ex: (5 + 2 = 7) - (5 % 2 = 1) = 7 - 1 = 6

4. Finally, it outputs the result (6).
*/