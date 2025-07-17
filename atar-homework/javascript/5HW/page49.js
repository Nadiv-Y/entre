
// question 1
function matrixHund(){
    let arr = new Array(10);
    let counter = 0;
    for(let j = 0; j < 10; j++){
        arr[j] = new Array(10);
        for(let i = 0; i < 10; i++){
            arr[j][i] = counter;
            counter++;
        }
    }
    return arr;
}

// let array = matrixHund();

// console.log(array);

// question 2
function diagOne(n){
    let arr = new Array(n);
    for(let i = 0; i < n; i++){
        arr[i] = new Array(n)
        for(let j = 0; j < n; j++){
            if(j === i || j === (n - 1 - i)){
                arr[i][j] = 1;
            }
            else{
                arr[i][j] = 0;
            }
        }
    }
    return arr;
}

// console.log(diagOne(8));

// question 3

function maxRow(arr){
    let max = 0;
    let maxSum = 0;
    for(i = 0; i < 10; i++){
        let sum = 0;
        for(let j = 0; j < 10; j++){
            sum += arr[i][j];
        }
        if(sum > maxSum){
            maxSum = sum;
            max = i;
        }        
    }
    return max;
}

let array1 = [1 ,2 ,3, 0, 0, 0, 0, 0, 0, 0];
let array2 = [1 ,2 ,3, 0, 0, 0, 0, 0, 0, 0];
let array3 = [1 ,2 ,3, 0, 0, 0, 0, 11, 0, 0];
let array4 = [1 ,2 ,3, 0, 0, 8, 0, 0, 0, 0];
let array5 = [1 ,7 ,5, 0, 0, 0, 0, 0, 0, 0];
let array6 = [1 ,2 ,3, 0, 0, 0, 0, 10, 0, 0];
let array7 = [5 ,2 ,3, 0, 0, 0, 0, 0, 0, 0];
let array8 = [5 ,2 ,3, 0, 0, 5, 0, 0, 0, 0];
let array9 = [1 ,2 ,3, 0, 0, 7, 0, 0, 0, 0];
let array10 = [1 ,2 ,3, 0, 0, 0, 2, 70, 0, 0];

let arrayBig = [
    array1, array2, array3, array4, array5, array6, array7, array8, array9, array10
]

// console.log(arrayBig);

// console.log(maxRow(arrayBig));

// question 4
function fiveSeven(arr){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            if(!(arr[i][j] % 5) || !(arr[i][j] % 7))
                arr[i][j] = 0;
        }
    }
    return arr;
}

console.log(fiveSeven(arrayBig));

// question 8


function oneTwoFrame(){
    let arr = new Array(10);
    for(let i = 0; i < 10; i++){
        arr[i] = new Array(10)
        for(let j = 0; j < 10; j++){
            arr[i][j] = 1;
        }
    }

    for(let a = 1, b = 8; a < b; a + 2, b - 2){
        for(let c = a; c <= b; c++){
            arr[a][c] = 2;
            arr[b][c] = 2;
        }
        for(let c = a; c <= b; c++){
            arr[a][c] = 2;
            arr[b][c] = 2;
        }


    }
    return arr;
}

