// JS_HomeWork/code_p49-ex2.js
/* Task:
 בנה מטריצה אשר כולה מלאה באפסים, חוץ מהאלכסונים אשר יהיו 1.
 (החלפתי את-1 ל-8888 כי יותר טוב ראוים את התוצעה )

 Create a matrix completely filled with zeros, except for the diagonals, which should contain 1s. (I've replaced the 1s with 8888s to make the result more distinctive.)
 */

 // Solution:
let matrixSize = 10;
let matrix = [];
for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    matrix[rowIndex] = [];
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        if (rowIndex === columnIndex || (rowIndex + columnIndex) === (matrixSize - 1)) {

/* If the current cell is on the main diagonal (i.e., `row === column`) → insert `8888`

If the current cell is on the secondary diagonal (i.e., `row + column === size - 1`) → insert `8888`. 

Otherwise → insert `0` */


            matrix[rowIndex][columnIndex] = 8888; // Set 8888 (instead of 1) on the main diagonal and anti-diagonal
        } else {
            matrix[rowIndex][columnIndex] = 0; // Fill the rest with 0
        }
    }
}
console.table(matrix);

/* Code Explanation:
The code creates a 10x10 matrix filled with zeros, except for the main diagonal and the anti-diagonal, which are filled with 8888s. 

In a square matrix of size N x N, the secondary diagonal (anti-diagonal) runs from the top-right to the bottom-left.
For a 10×10 matrix (matrixSize = 10), the anti-diagonal includes the following coordinates:
(row 0, col 9)
(row 1, col 8)
(row 2, col 7)
...
(row 9, col 0)
In each of these cases, the sum of the row and column indices is:
rowIndex + columnIndex = matrixSize - 1 → 9


The main diagonal runs from the top-left to the bottom-right, and it includes the coordinates:
(row 0, col 0)
(row 1, col 1)
(row 2, col 2)
...


*/