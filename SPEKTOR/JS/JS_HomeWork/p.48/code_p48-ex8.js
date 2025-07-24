// JS_HomeWork/code_p48-ex8.js
/* Task:
 בדוק האם מערך בגודל 10 מהווה פולינדרום או לא.

 Check whether a 10-element array is a palindrome.

What’s a palindrome?
A palindrome is a sequence that reads the same forward and backward.
For example:
The array [1, 2, 3, 2, 1] is a palindrome
The array [4, 5, 6, 5, 7] is not a palindrome

The goal is to check if the first element equals the last, the second equals the second-to-last, and so on…
*/

// Solution:
let totalNumbers = 10;
let numbers = [];


for (let number = 1; number <= totalNumbers; number++) {
    let randomNumber = Math.floor(Math.random() * 6); 
    console.log(`Number ${number}: ${randomNumber}`);
    numbers.push(randomNumber); 
}

for (let i = 0; i < numbers.length/2; i++) {
    let start = numbers[i];
    let end = numbers[numbers.length - 1 - i];
    
   
    if (start !== end) { 
        console.log(`The array is NOT a palindrome: ${start} !== ${end}`);
        break; 
    }
    else if (i === numbers.length/2 - 1) {
        console.log("The array is a palindrome!");
    }

}

/* Code Explanation:
let totalNumbers = 10; // Define how many numbers will be in the array (even number)
let numbers = [];      // Create an empty array to store the numbers

// Generate 10 random numbers between 0 and 5
for (let number = 1; number <= totalNumbers; number++) {
    let randomNumber = Math.floor(Math.random() * 6); // Random number from 0 to 5
    console.log(`Number ${number}: ${randomNumber}`); // Print the generated number
    numbers.push(randomNumber); // Add it to the array
}

// Loop through the first half of the array to compare it with the second half
for (let i = 0; i < numbers.length / 2; i++) {
    let start = numbers[i]; // Get the number from the start
    let end = numbers[numbers.length - 1 - i]; // Get the matching number from the end

    // If the numbers don’t match, it's not a palindrome
    if (start !== end) {
        console.log(`The array is NOT a palindrome: ${start} !== ${end}`);
        break; // Stop checking once a mismatch is found
    }
    // If we reached the middle without mismatches, it's a palindrome
    else if (i === numbers.length / 2 - 1) { // Check if we are at the last comparison
    //(i === numbers.length / 2 - 1) This condition is only true during the last iteration of the loop, if all previous pairs matched. If we're on that final matching pair, and start === end for that pair too, then we can confidently say: The array is a palindrome.
        console.log("The array is a palindrome!");
    }
}

*/

