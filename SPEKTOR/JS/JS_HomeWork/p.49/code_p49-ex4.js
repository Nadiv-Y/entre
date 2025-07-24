// JS_HomeWork/code_p49-ex4.js
/* Task:
 קלוט נתונים למטריצה בגודל 10×10. הדפס את כל התאים המתחלקים בשלמות ב־5 או ב־7.
 
 Input data into a 10×10 matrix. Print all the cells that are divisible by 5 or by 7.
*/

//Solution:
let matrixSize = 10;
let matrix = [];

for (let rowIndex = 0; rowIndex < matrixSize; rowIndex++) {
    matrix[rowIndex] = [];
    for (let columnIndex = 0; columnIndex < matrixSize; columnIndex++) {
        let number = Math.floor(Math.random() * 100);
        matrix[rowIndex][columnIndex] = number;

        // if (number % 5 === 0 || number % 7 === 0) {
        //     console.log(number);
        // }
        if (number % 5 === 0) {
            console.log(`Row ${rowIndex}, Column ${columnIndex}: ${number} is divisible by 5`);
        }
        if (number % 7 === 0) {
            console.log(`Row ${rowIndex}, Column ${columnIndex}: ${number} is divisible by 7`);
        }
    }
    
}
console.table(matrix); 