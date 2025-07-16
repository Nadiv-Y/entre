// עמ׳ 31: 2
function numberBetween(num1, num2) {
  let numbetween;
  if (num1 > num2) {
    numbetween = num2;
    for (numbetween; numbetween < num1 + 1; numbetween++) {
      return numbetween;
    }
  } else {
    numbetween = num1;
    for (numbetween; numbetween < num2 + 1; numbetween++) {
      return numbetween;
    }
  }

  while (numbetween) {}
}
// עמ׳ 31: 3
function factorial(N) {
  let i = N,
    sum = 1;
  for (let index = 1; index < N + 1; index++) {
    sum = sum * index;
  }
  console.log(sum);
}

// עמ׳ 31: 4

function sumDividBy3(N) {
  let sum = 0;
  for (let index = 0; index < N; index += 3) {
    sum += index;
  }
  return sum;
}

// עמ׳ 31: 5
function sumThirdPlace(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i += 3) {
    sum += arr[i];
  }
  return sum;
}

//שאלה 3 עמוד 37
function gradeAverege(grades) {
  let sum = 0;
  for (let value of grades) {
    sum += value;
  }
  return sum / grades.length;
}

function schoolAverege(students) {
  let sum = 0;
  let count = 0;

  for (let key in students) {
    sum += gradeAverege(students[key]);
    count++;
  }
  return sum / students.length;
}

//שאלה 7 עמוד 37

function whatBetween(
  num1,
  num2,
  num3,
  num4,
  num5,
  num6,
  num7,
  num8,
  num9,
  num10
) {
  let arr = new Array(
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num7,
    num8,
    num9,
    num10
  );
  numberBetween(arr[0], arr[1]);
  
}

// עמ׳ 48: 8
function plindrom(arr) {
  let count = 0;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] == arr[arr.length - index]) {
      count++;
    }
  }
  if (count === 5) console.log("plindrom");
  else console.log("no plindrom");
}
// עמ׳ 49:  1, 2, 3 (יש שתי דרכים לפתור ), 4 , 8

//עמ 49 :1

function matrix100() {
  let matrix = [];
  let size = 10;
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(i + j);
    }
    matrix.push(row);
  }
}

//עמ 49 :2
function matrixSlant() {
  let matrix = [];
  let size = 10;
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      if (i == j || i + j == size - 1) {
        row.push(1);
      } else row.push(0);
    }
    matrix.push(row);
  }
  return matrix;
}

// עמ 49 :3

function biggestRowAverage(matrix) {
  let maxAverege = 0;
  let line = 0;
  for (let i = 0; i < 10; i++) {
    if (schoolAverege(matrix[i]) > maxAverege) {
      line = i;
    }
  }
  console.log("the biggest Averege in line" + line);
}

//עמ 49 :4

function matrixDividBy5or7(matrix) {
  let size = 10;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] % 5 === 0 || matrix[i][j] % 5 === 0) {
        matrix[i][j] = 0;
      }
    }
  }
}

//עמ 49 :8
function matrixSlant() {
  let count = 1;
  let matrix =[];
  let size = 10;
   for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  for (let count = 1; count < size / 2; count++) {
    for (let i = count; i < size - count; i++) {
      for (let j = count; j < size - count; j++) {
        matrix[i][j] = count;
      }
      }
  }
  return matrix;
}
