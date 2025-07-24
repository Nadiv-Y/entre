// JS_HomeWork/code_p49-ex1.js
/*Task:
מלא מטריצה בגודל 10×10 במספרים עוקבים (0–99).

Fill a 10x10 matrix with consecutive numbers (0-99).
*/

// Solution:
let matrixSize = 10;
let matrix = [];

for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    matrix[rowIndex] = [];
    for (let j = 0; j < matrixSize; j++) {
        matrix[rowIndex][j] = rowIndex * matrixSize + j;
    }
}

console.log("Matrix filled with consecutive numbers (0-99):");
console.table(matrix); // היי יוסי, אני יודעת שלא למדנו את זה עדיין, אבל זה מדפיס את המטריצה בצורה יפה כמו טבלה באקסל, ככה קל לראות אותה.


/*// Code Explanation:
let matrixSize = 10; // This sets the matrix size to 10, meaning it will have 10 rows and 10 columns.
let matrix = []; // Create an empty array that will eventually become your matrix (array of arrays).


for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) { //Starts a loop that runs 10 times (for each row), rowIndex goes from 0 to 9.
    matrix[rowIndex] = []; //Creates a new empty row (array) inside the matrix for each rowIndex.
    // Loop through each column of the matrix
    for (let j = 0; j < matrixSize; j++) { //A nested loop for each column in the current row. Runs 10 times for each row (j goes from 0 to 9).
        matrix[rowIndex][j] = rowIndex * matrixSize + j; // This is the key formula to fill each cell with a unique number between 0–99.


//         Why this formula?
// rowIndex * matrixSize //gives the starting number for each row:
// Row 0 → starts at 0 × 10 = 0
// Row 1 → starts at 1 × 10 = 10
// Row 2 → starts at 2 × 10 = 20
// (and so on...)

// + j increments the number across the row:
// Row 0 → 0 + 0, 0 + 1, … 0 + 9 → [0, 1, 2, …, 9]
// Row 1 → 10 + 0, 10 + 1, … 10 + 9 → [10, 11, …, 19]
// Row 2 → 20 + 0, 20 + 1, … 20 + 9 → [20, 21, …, 29]
// Row 9 → 90 + 0, 90 + 1, … 90 + 9 → [90, 91, …, 99]


    }
}
console.log("Matrix filled with consecutive numbers (0-99):");
console.table(matrix); // nicely prints the matrix in a grid format like an Excel table — making it easy to read.

*/