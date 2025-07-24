// JS_HomeWork/code_p49-ex3.js
/* Task:
קלוט נתונים למטריצה בגודל 10*10. הדפס את מספר השורה בה סכום האברים הוא הגבוה ביותר.

Input data into a 10×10 matrix. Print the row number with the highest sum of elements.

1. Create a 10×10 matrix
    This is a grid (array of arrays) with 10 rows and 10 columns.
    So you’ll have 100 total numbers.

2. 	Input data
    You can generate random numbers or simulate input from a user (e.g., fill with numbers from 0 to 99, or random numbers between 1–100).

3. 	Calculate the sum of each row
    For each row in the matrix, add up all 10 values in that row.

4. 	Find the row with the highest total
    Compare the sums of all the rows.
    Identify the one with the largest sum.

5. 	Print the row number (index)
    Output the row number (typically starting from 0 or 1) that had the highest sum.
*/

// Solution:
let matrixSize = 10;
let matrix = [];

for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    matrix[rowIndex] = [];
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        let number = Math.floor(Math.random() * 100);
        matrix[rowIndex][columnIndex] = number;
    }
}
console.table(matrix);

let highestSum = 0;
let highestRowIndex = 0;
for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    let rowSum = 0;
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        rowSum += matrix[rowIndex][columnIndex];
    }
    console.log(`Row sum for row ${rowIndex}: ${rowSum}`);

    if (rowSum > highestSum) {
        highestSum = rowSum;
        highestRowIndex = rowIndex;
    }
}

console.log(`\nRow with the highest sum is row ${highestRowIndex} with a total of ${highestSum}`);



/* // Explanation:
let matrixSize = 10; //The variable matrixSize defines that we want a 10-by-10 grid.
let matrix = []; //An empty array matrix is created to hold all the rows.


//This double loop creates 10 rows and fills each with 10 random numbers between 0 and 99
for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    matrix[rowIndex] = []; // Creating an empty row
    // For each row, we create an empty array to hold the column values.
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        // For each column in the row, we generate a random number.
        let number = Math.floor(Math.random() * 100);
        matrix[rowIndex][columnIndex] = number; // Fill matrix
    }
}
console.table(matrix); //This command prints the whole 2D array in a visual table format, making it easier to inspect in the browser console.


//Finding the row with the highest total sum

//These two variables track the highest sum found and the corresponding row index.
let highestSum = 0;
let highestRowIndex = 0;

//This loop iterates through each row of the matrix.
for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    let rowSum = 0;

    //For each row, the code adds up all 10 numbers and logs the sum.
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        rowSum += matrix[rowIndex][columnIndex];
    }
    console.log(`Row sum for row ${rowIndex}: ${rowSum}`);

    //If the current row’s sum is higher than the previously recorded highest, the if-equation updates highestSum and stores the index of that row in highestRowIndex.
    if (rowSum > highestSum) {
        highestSum = rowSum;
        highestRowIndex = rowIndex;
    }
}

console.log(`\nRow with the highest sum is row ${highestRowIndex} with a total of ${highestSum}`); //Displays which row had the highest total and what that total was.


*/