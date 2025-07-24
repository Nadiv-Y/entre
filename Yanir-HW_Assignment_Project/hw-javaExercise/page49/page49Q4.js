
let matrix = []


for (let i = 0; i < 10; i++) {
    matrix[i] = [];   

for (let j = 0; j < 10; j++) {
    matrix[i][j] = i*10 + j;  


for ( let k =0; k < 10; k++) {
    if (matrix[i][j] % 5 === 0 || matrix[i][j] % 7 === 0 )
        matrix[i][j] = 0
}
}
}




console.log(matrix);

