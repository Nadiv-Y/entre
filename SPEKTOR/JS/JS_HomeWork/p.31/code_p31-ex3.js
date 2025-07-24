// JS_HomeWork/code_p31-ex3.js
/* Task:
קלוט נתון למשתנה N.
חשב והדפס את N 
 עצרת לפי הנוסחה: N!
S! = 1 * 2 * 3 * … * N

3. Input a value for variable N. Calculate and print the factorial of N using the formula:
S! = 1 * 2 * 3 * … * N
*/

// Solution:
let N = 5;
let factorial = 1;
for (let i = 1; i <= N; i++) {
    factorial *= i;
}
console.log(`The factorial of ${N} is ${factorial}.`);


/* Code Explanation:

The code initializes a variable N with a value of 5 and calculates its factorial using a for loop.

The loop iterates from 1 to N, multiplying the current value of factorial by each integer i in that range.

Finally, it prints the result to the console in a formatted string.

*/

