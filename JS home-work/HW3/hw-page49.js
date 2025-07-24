// תרגיל 1
let matrixMultiplicationTable = [];

function SequentialNumber(arr) {
  count = 0;
  for (let i = 0; i < 10; i++) {
    arr.push([]);
    // arr[i] = [];

    for (let j = 0; j < 10; j++) {
      arr[i][j] = count;
      count++;
    }
  }
  console.log(arr);
  // return arr
}

SequentialNumber(matrixMultiplicationTable);

// תרגיל 2

function matritsaZeroOne() {
  let arr = [];
  let numOne = 0;
  let numOne2 = 9;
  for (let i = 0; i < 10; i++) {
    arr.push([]);

    for (let g = 0; g < 10; g++) {
      arr[i][g] = 0;
    }

    arr[i][numOne] = 1;
    arr[i][numOne2] = 1;
    numOne++;
    numOne2--;
  }

  console.log(arr);
}
matritsaZeroOne();

// תרגיל 3 הדפסת שורה עם סכום אברים גבוה

function lineWithCountBig(arrmatrix) {
  let arrBig = 0;
  let numLine = 0;
  for (const key in arrmatrix) {
    let count = 0;
    for (const item of arrmatrix[key]) {
      count += item;
    }
    //    console.log(count);

    if (count > arrBig) {
      arrBig = count;
      numLine = key;
    }
    // console.log(key);
  }
  return arrBig, numLine;
}
console.log(lineWithCountBig(matrixMultiplicationTable));

// תרגיל 4 איפוס מספרים במטריצה שמתחלקים בשלמות ב 5 וב7

function resetCellsDivisibleByFiveAndSeven(arrmatrix) {
  for (const key in arrmatrix) {
    for (const item in arrmatrix[key]) {
      if (!(arrmatrix[key][item] % 7) || !(arrmatrix[key][item] % 5)) {
        arrmatrix[key][item]= 0  
   
        
      }
    }
  }
  return arrmatrix
}
console.log(resetCellsDivisibleByFiveAndSeven(matrixMultiplicationTable));
// שאלה 8 

function matrix (){
  let matrix = [];
  for(let i = 0; i< 10  ;i++ ){
   matrix.push([])
    for(let j = 0 ; j <10 ; j++){
      switch (true) {
        case j == 0 || j == 9|| i == 0 || i == 9:
          matrix[i][j] = 1
          break;
        case j == 1 || j == 8|| i == 1 || i == 8:
          matrix[i][j] = 2
          break;
        case j == 2 || j == 7|| i == 2 || i == 7:
          matrix[i][j] = 3
          break;
        case j == 3 || j == 6|| i == 3 || i == 6:
          matrix[i][j] = 4
          break;
        case j == 4 || j == 5|| i == 4 || i == 5:
          matrix[i][j] = 5
          break;
      
      }

    }
  }
  return matrix
}

console.log(matrix());


