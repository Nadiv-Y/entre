// JS_HomeWork/code_p32-ex5.js
/* Task:
קלוט 99 נתונים, סכם כל נתון שלישי (כלומר תצטרך לסכם את הנתון השלישי, שישי, תשיעי...) הדפס את התוצאה.
//Input 99 values. Sum every third value (that is, you need to sum the 3rd, 6th, 9th… values). Print the result.
*/

//Solution:
let values = [];

for (let i = 0; i < 99; i++) {
    let randomNumber = Math.floor(Math.random() * 400);
    values.push(randomNumber);
}

let sumOfThirds = 0;
for (let i = 2; i < values.length; i += 3) {
    console.log(`Index ${i + 1} (value = ${values[i]})`);
    sumOfThirds += values[i];
}

console.log(`The sum of every third value from the generated array is: ${sumOfThirds}`);


/* //Code Explanation:

let values = []; // Initialize an empty array to hold the values

// The code generates 99 random numbers  from 0 up to (but not including) 400
for (let i = 0; i < 99; i++) {
    let randomNumber = Math.floor(Math.random() * 400);
    values.push(randomNumber);
    //The .push method in JavaScript is used with arrays to add one or more elements to the end of the array. 
    // When you call array.push(element), the specified element is appended, and the method returns the new length of the array.
    //It’s important to note that.push modifies the original array rather than creating a new one, which can affect other parts of your code if you’re sharing the array between functions or objects.
}
console.log("Generated array of values:", values); // Optional: full list of generated values

// Now we sum every third value and show them
let sumOfThirds = 0;
console.log("Values being added:");

for (let i = 2; i < values.length; i += 3)//This accesses the 3rd, 6th, 9th, ... 99th values correctly (because arrays are 0-indexed, so index 2 is the 3rd value: i=2) and increments by 3 each time to get every third value: i +=3.

//Why do we need i < values.length; and not just i < VALUES is wrong:
//VALUES is an array, not a number — so i < VALUES doesn’t make sense and will likely return FALSE or CRASH.
{
    console.log(`Index ${i + 1} (value = ${values[i]})`);
    sumOfThirds += values[i];
}

console.log(`\nThe sum of every third value from the generated array is: ${sumOfThirds}`); //The \n in JavaScript is an escape sequence that represents a newline character. When included in a string, it causes the text to break onto a new line. This is useful for formatting output, such as when printing multiple lines to the console or creating multi-line strings.


*/