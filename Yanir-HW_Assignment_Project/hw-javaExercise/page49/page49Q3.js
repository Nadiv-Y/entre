
let matrix = []
let lineSum = [];
let largestPlace =0;
let largestNum = 0;
let sum = [];

for (let i = 0; i < 10; i++) {
    matrix[i] = [];   
    sum = 0;

    for (let j = 0; j < 10; j++) {
    matrix[i][j] = Math.floor(Math.random ()*10);  
     sum += matrix[i][j]     
    }

lineSum[i] = sum

}


console.log("linesum", lineSum);


for (let i=0; i<10 ; i++) {

    if (largestNum < lineSum[i]) {
        largestNum = lineSum[i];
        largestPlace = [i+1];
    }
    else (largestNum = largestNum)
}
console.log("largest num ",largestNum,"largest num Row: ", (largestPlace++) );
