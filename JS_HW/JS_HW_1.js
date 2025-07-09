/*Q2 P31*/
function displayBetween(num1, num2) {
  if (num1 > num2) {
    console.log("The first number should be less than the second number.");
    return;
  }

  for (let i = num1; i <= num2; i++) {
    console.log(i);
  }
}

/*Q3 P31*/
function displayFactorial(N) {
  if (N < 0) {
    console.log("Factorial is not defined for negative numbers.");
    return;
  }

  let S = 1;
  for (let i = 1; i <= N; i++) {
    S *= i;
  }

  console.log(`The factorial of ${N} is ${factorial}.`);
}

/*Q4 P31*/
function sumOfNumDividedByThree(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0) {
      sum += i;
    }
  }

  console.log(
    `The sum of numbers from 1 to ${num} that are divisible by 3 is: ${sum}.`
  );
}

/*Q5 P32*/
function sumOfEveryThierdNum(arrOfNum) {
  let sum = 0;

  if (arrOfNum.length === 0) {
    console.log("The array is empty.");
    return;
  } else if (arrOfNum.length === 99) {
    for (let i = 2; i < arrOfNum.length; i += 3) {
      sum += arrOfNum[i];
    }

    console.log(`The sum of every third number in the array is: ${sum}.`);
  } else {
    console.log("The array must contain 99 elements.");
    return;
  }
}

/*Q3 P37*/
function calculateStudentAverageAndSchoolAverage(students) {
  if (students.length === 0) {
    console.log("The array is empty.");
    return;
  }

  for (let i = 0; i < students.length; i++) {
    if (students[i].length !== 10) {
      console.log(`Student ${i + 1} does not have 10 grades.`);
      return;
    }
  }

  let studentAverage;
  let schoolAverage = 0;

  for (let i = 0; i < students.length; i++) {
    studentAverage = 0;

    for (let j = 0; j < students[i].length; j++) {
      studentAverage += students[i][j];
    }

    studentAverage /= students[i].length;
    console.log(`Student ${i + 1} average: ${studentAverage}`);
    schoolAverage += studentAverage;
  }

  totalAverage /= students.length;
  console.log(`School average: ${totalAverage}`);
}

/*Q7 P37*/
function displayNumbersBetweenTwoNumbersInArray(arr) {
  if (arr.length === 0) {
    console.log("The array is empty.");
    return;
  }
  if (arr.length < 2) {
    console.log("The array must contain at least two elements.");
    return;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    let start = arr[i];
    let end = arr[i + 1];
    if (start === end) {
      console.log(start);
    }
    while (start < end) {
      console.log(start);
      start++;
    }
    while (end < start) {
      console.log(start);
      start--;
    }
  }
  console.log(arr[arr.length - 1]);
}

/*Q8 P48*/
function checkIfArrayIsPolindrome(arr) {
  if (arr.length === 0) {
    console.log("The array is empty.");
    return;
  }

  let isPalindrome = true;

  if (arr.length === 10) {
    for (let i = 0; i < 5; i++) {
      if (arr[i] !== arr[arr.length - 1 - i]) {
        isPalindrome = false;
        break;
      }
    }
  } else {
    console.log("The array must contain 10 elements.");
    return;
  }

  if (isPalindrome) {
    console.log("The array is a palindrome.");
  } else {
    console.log("The array is not a palindrome.");
  }
}

/*Q1 P49*/
function fillMatrixwithNumbersOneToNintyNine(matrix) {
  if (matrix.length !== 10 || matrix[0].length !== 10) {
    console.log("The matrix must be 10x10.");
    return;
  }

  let num = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = num++;
    }
  }

  console.log("Matrix filled: ");
  console.table(matrix);
}

/*Q2 P49*/
function matrixWithZerosAndDiagonalFillWithOnes(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === j) {
        matrix[i][j] = 1;
      } else if (i + j === matrix.length - 1) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }

  console.log("Matrix filled with zeros and diagonal with ones: ");
  console.table(matrix);
}

/*Q3 P49*/
function displayRowNumberWithLargestSum(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    console.log("The matrix is empty.");
    return;
  }
  if (matrix.length !== 10 || matrix[0].length !== 10) {
    console.log("The matrix must be 10x10.");
    return;
  }

  let maxSum = -Infinity;
  let rowIndex;

  for (let i = 0; i < matrix.length; i++) {
    let rowSum = 0;
    for (let j = 0; j < matrix[i].length; j++) {
      rowSum += matrix[i][j];
    }
    if (rowSum > maxSum) {
      maxSum = rowSum;
      rowIndex = i;
    }
  }

  console.log(`Row with the largest sum is: Row ${rowIndex + 1}.`);
}

/*Q4 P49*/
function inputZeroInAllIndexesDividedByFiveAndSevenInMatrix(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    console.log("The matrix is empty.");
    return;
  }
  if (matrix.length !== 10 || matrix[0].length !== 10) {
    console.log("The matrix must be 10x10.");
    return;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if ((i + j) % 5 === 0 || (i + j) % 7 === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  console.log(
    "Matrix after filling with zeros at indexes divided by five or seven: "
  );
  console.table(matrix);
}

/*Q8 P49*/
function fillMatrixWithBordersOfNumbersIncreasing(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    console.log("The matrix is empty.");
    return;
  }
  if (matrix.length !== 10 || matrix[0].length !== 10) {
    console.log("The matrix must be 10x10.");
    return;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      let top = i;
      let left = j;
      let bottom = matrix.length - 1 - i;
      let right = matrix.length - 1 - j;

      let layer = top;
      if (left < layer) {
        layer = left;
      } else if (bottom < layer) {
        layer = bottom;
      } else if (right < layer) {
        layer = right;
      }
      matrix[i][j] = layer + 1;
    }
  }

  console.log("Matrix filled with borders of numbers increasing: ");
  console.table(matrix);
}

let matrix = Array.from({ length: 10 }, () => Array.from({ length: 10 }));

fillMatrixWithBordersOfNumbersIncreasing(matrix);
