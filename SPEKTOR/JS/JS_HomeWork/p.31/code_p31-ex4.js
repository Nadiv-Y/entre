// JS_HomeWork/code_p31-ex4.js
/* Task:
(N) קלט נתון למשתנה . 
(N)חשב והדפס את סכום המספרים מ־1 ועד 
 אשר מתחלקים ב־3
(לדוגמא: אם הנתון היה 7 אזי התוצאה תהיה 9 כי 3 ו־6 מתחלקים ל־3).


Input a value for variable N. Calculate and print the sum of the numbers from 1 to N that are divisible by 3.
(For example: if the input is 7, the result will be 9 because 3 and 6 are divisible by 3.) */

// Solution:
let N = 20;
let sum = 0;
for (let i = 1; i <= N; i++) {
    if (i % 3 === 0) {
        sum += i;
    }
}
console.log("The sum of numbers from 1 to " + N + " that are divisible by 3 is: " + sum);

//console.log(`The sum of numbers from 1 to ${N} that are divisible by 3 is: ${sum}`);


/* // Alternative using a WHILE LOOP


let N = 20;
let sum = 0;
let i = 1;

while (i <= N) {
    if (i % 3 === 0) {
        sum += i;
    }
    i++;
}

console.log(`The sum of numbers from 1 to ${N} that are divisible by 3 is: ${sum}`);
*/