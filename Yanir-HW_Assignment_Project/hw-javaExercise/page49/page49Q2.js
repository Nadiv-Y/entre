
let matric = []
let start = 0;
let end = 9;


for (let i = 0; i < 10; i++) {
    matric[i] = [];   
    
    
    for (let j = 0; j < 10; j++) {
    matric[i][j] = 0;  
}
}
console.log(matric);


for ( let i = 0; i < 10; i++) {
    matric[i][start + i] = 1
    matric[i][end - i] = 1

}
