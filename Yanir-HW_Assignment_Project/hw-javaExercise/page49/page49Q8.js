
let matrix = []
let start = 0;
let end = 9;

for (let i = 0; i < 10; i++) {
    matrix[i] = [i+1];   

    for (let j = 0; j < 10; j++) {
            if (i < 5 ) {
            matrix[i][j] = i+1 ;
        }
        // else if (i < 5) {
        //     matrix[i][j] = i*j -1;
        // }
        else if (i >= 5 ) {
            matrix[i][j] = 10-i;
        }
        

    }
}
let temp;

// for ( let k = 0; k < 10; k++) {
//     matrix[end-k][end-k] = k+k;
    // matrix[k][end-k] = k+1;
    // matrix[k][k] = k+1;
    // matrix[k][end-k] = k+1;


// }


console.log(matrix);


