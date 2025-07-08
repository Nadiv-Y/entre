function firstQuestion(arr) {
  let count = 0
  let columns = 10
  for(let i = 0; i<columns; i++){
    let rows = 10
    let tempArr = []
    for (let j = 0; j < rows; j++) {
      tempArr.push(count)
      count += 1      
    }
    arr.push(tempArr)
  }
  return arr
}


function secondQuestion(length) {
  let arr = []
  for (let i = 0; i < length; i++) {
    let tempArr = []
    for (let j = 0; j < length; j++) {
      if (i === j || i + j === length - 1) 
        tempArr.push(1);
      else
        tempArr.push(0);
    }
    arr.push(tempArr)
  }
  return(arr)
}

function thirdQuestion(matrix) {
  let maxSum;
  let rowNumber = 0;
  for(arr in matrix){
    let tempSum = 0;
    for(number of matrix[arr]){
      tempSum += number
    }
    if (maxSum === undefined){
      maxSum = tempSum
      rowNumber = arr
    }
    else if(maxSum < tempSum){
      maxSum = tempSum
      rowNumber = arr
    }
  }
  console.log("Max Sum within row number: ", rowNumber);
  
}

function fourthQuestion(matrix) {
  for(arr in matrix){
    for(number in matrix[arr]){
      if (matrix[arr][number] % 5 === 0 || matrix[arr][number] % 7 === 0) {
        matrix[arr][number] = 0
      }
    }
  }
  return matrix
}

function eighthQuestion(matrixLength) {
  let matrix = [];
  for (let i = 0; i < matrixLength / 2; i++) {
    let tempArr = [];
    let numberCounter = 1;
    let rowCounter = i;
    for (let j = 0; j < matrixLength / 2; j++) {
      if (j !== 0 && rowCounter !== 0) {
        numberCounter += 1;
        rowCounter -= 1;
      }
      tempArr[j] = numberCounter;
      tempArr[matrixLength - j - 1] = numberCounter;
    }
    matrix[i] = tempArr;
    matrix[matrixLength - i - 1] = tempArr;
  }
  return matrix
}
console.log(eighthQuestion(20));
