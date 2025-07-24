// JS_HomeWork/p.20/code_p20-ex5.js
/* Task: 
The number of days in each month is fixed, except for February (2):
Month	1	  2	   3	  4	  5	  6	  7	  8	  9	 10	  11  12
Days	31  28/9  31	 30	 31	 30	 31	 31	 30	 31	  30  31
In a regular year, February has 28 days, and in a leap year — 29.
Input the year and the month number, and display the number of days in that month.
You may use the leap year check from question 4.
*/

//Solution:
// Input: Define the month (1–12) and the year
let month = 2;
let year = 2024;

// Initialize variable to store number of days
let days;

// Check if the month is February (2)
if (month === 2) {
  // Check if the year is a leap year
  // Leap year: divisible by 4 AND (not divisible by 100 OR divisible by 400)
  if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
    days = 29; // Leap year
  } else {
    days = 28; // Regular year
  }
} 

// Months with 30 days: April (4), June (6), September (9), November (11)
else if (month === 4 || month === 6 || month === 9 || month === 11) {
  days = 30;
} 
// All other months have 31 days
else {
  days = 31;
}

// Output the result
console.log(`The month ${month} of the year ${year} has ${days} days.`);










