//JS_HomeWork/code_p15-ex3.js
/* Task:
קלט קוטר ועומק של הסיר והצג את קיבולת שלו.

Input the diameter and depth of a pot and display its capacity (volume).
*/

//Solution:
let d = 26; // diameter in centimeters
let h = 10.4; // height in centimeters
let pi = Math.PI;

let radius = d / 2;

// Volume in cubic centimeters (cm³)
let volumeCm3 = pi * (radius ** 2) * h;

// Converting cm³ to liters
let volumeLiters = volumeCm3 / 1000;

console.log("Diameter (cm):", d);
console.log("Height (cm):", h);
console.log("Radius (cm):", radius);
console.log("Volume (cm³):", volumeCm3.toFixed(2)); // Rounded to 2 decimal places
console.log("Volume (liters):", volumeLiters.toFixed(1));
