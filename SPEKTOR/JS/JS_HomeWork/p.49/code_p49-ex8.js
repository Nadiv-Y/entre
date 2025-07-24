// JS_HomeWork/code_p49-ex8.js
/* Task:
 מלא מטריצה בגודל 10×10 בצורה הבאה: 
 המסגרת החיצונית במספר 1, 
 המסגרת הפנימית ביותר במספר 2
  וכך הלאה.

Fill a 10×10 matrix as follows: 
the outermost border with the number 1, 
the next inner border with the number 2, and so on.
*/

//Solution:
// JS_HomeWork/code_p49-ex8.js

let matrixSize = 10;
let matrix = [];

// Initialize matrix with zeros
for (let i = 0; i < matrixSize; i++) {
    matrix[i] = new Array(matrixSize).fill(0);
}

let layers = Math.ceil(matrixSize / 2);

for (let layer = 0; layer < layers; layer++) {
    let value = layer + 1;
    let start = layer;
    let end = matrixSize - 1 - layer;

    for (let i = start; i <= end; i++) {
        matrix[start][i] = value;         // Top row
        matrix[end][i] = value;           // Bottom row
        matrix[i][start] = value;         // Left column
        matrix[i][end] = value;           // Right column
    }
}

console.table(matrix);