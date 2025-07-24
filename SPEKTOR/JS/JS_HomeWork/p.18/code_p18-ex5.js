//JS_HOMEWORK/P.18/CODE_P18_EX5.JS
/* Task:
The income tax table sets tax brackets as follows:

1. For every shekel from 0 to 23,000 NIS – the tax rate is 10%.
2. For every shekel from 23,001 to 46,000 NIS – the tax rate is 20%.
3. For every shekel from 46,001 to 74,000 NIS – the tax rate is 30%.
4. For every shekel from 74,001 to 100,000 NIS – the tax rate is 40%.
5. For every additional shekel – the tax rate is 50%.

Input the freelancer’s name and income.

Output the total amount the freelancer has to pay in income tax (read carefully the tax definitions).
*/

// Solution:
// Step 1: Declare the freelancer's name as a string
let freelancerName = "Antony Gold";

// Step 2: Declare the income value
let income = 16000;

// Step 3: Declare a variable to store the tax amount
let incomeTax;

// Step 4: Determine the correct tax bracket and calculate tax accordingly
if (income <= 23000) {
  incomeTax = income * 0.1; // 10% tax for income up to 23,000
} else if (income <= 46000) {
  incomeTax = income * 0.2; // 20% tax for income between 23,001 and 46,000
} else if (income <= 74000) {
  incomeTax = income * 0.3; // 30% tax for income between 46,001 and 74,000
} else if (income <= 100000) {
  incomeTax = income * 0.4; // 40% tax for income between 74,001 and 100,000
} else {
  incomeTax = income * 0.5; // 50% tax for income above 100,000
}

// Step 5: Output the result
console.log(`Freelancer's Name: ${freelancerName}`);
console.log(`Income: ${income} NIS`);
console.log(`Total Income Tax to Pay: ${incomeTax} NIS`);