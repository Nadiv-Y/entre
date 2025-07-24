//JS_HomeWork/code_p15-ex4.js
/* Task:
קלוט אורך של סרט קולנוע בדקות והצג את אורך הסרט בשעות ודקות.

Input the length of a movie in minutes and display the duration in hours and minutes.
*/

//Solution:
let runningTime = 92;

// Calculating hours and minutes
let hours = runningTime / 60 - ((runningTime / 60) % 1);
//	92 / 60 = 1.5333...
//	(92 / 60) % 1 = 0.5333... - The modulo operator (%) returns the remainder after division.
//	So: 1.5333... - 0.5333... = 1
let minutes = runningTime - hours * 60;

// Output
console.log('The running time is: ' + hours + ' hour(s), ' + minutes + ' minute(s)');
