// JS_HomeWork/code_p31-ex2.js
/* Task:
 קלט שני שלמים. הצג את כל השלמים שביניהם (כולל) מהראשון שקלטת ועד השני שקלטת.

 Input two integers. Display all the integers between them (inclusive), starting from the first one entered and ending at the second one.
 */

// Solution:
let firstNumber = 7;
let secondNumber = 12;

if (firstNumber < secondNumber) {
    let i = firstNumber;
    while (i <= secondNumber) {
        console.log(i);
        i++;
    }
} else if (firstNumber > secondNumber) {
    let i = firstNumber;
    while (i >= secondNumber) {
        console.log(i);
        i--;
    }
} else {
    console.log("The numbers are equal, so there are no integers in between.");
}


/* Code Explanation:
The code checks if the first number is less than, greater than, or equal to the second number and prints all integers in between accordingly. If they are equal, it informs that there are no integers in between.

It Uses ELSE IF to connect all three possible cases: 1)First number smaller; 2)First number larger; 3)Equal numbers;

The code uses a WHILE LOOP to iterate through the range of integers and prints each integer to the console. */