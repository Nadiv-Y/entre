// Question 1

function matrix100() {
  let matrix = [];
  let number = 0;

  for (let i = 0; i < 10; i++) {
    let row = [];

    for (let j = 0; j < 10; j++) {
      row.push(number);
      number = number + 1;
    }

    matrix.push(row);
  }

  for (let i = 0; i < 10; i++) {
    let line = "";

    for (let j = 0; j < 10; j++) {
      line = line + matrix[i][j] + " ";
    }

    console.log(line);
  }
}

matrix100();

// =======================================================

// Question 2

function xMatrix() {
  let matrix = [];

  for (let i = 0; i < 10; i++) {
    let row = [];

    for (let j = 0; j < 10; j++) {
      if (i === j || i + j === 9) {
        row.push(1); // באלכסון הראשי או המשני
      } else {
        row.push(0); // בכל שאר המקומות
      }
    }

    matrix.push(row);
  }

  for (let i = 0; i < 10; i++) {
    let line = "";
    for (let j = 0; j < 10; j++) {
      line = line + matrix[i][j] + " ";
    }
    console.log(line);
  }
}

xMatrix();

// =======================================================

// Question 3

function biggestRow(matrix) {
  let maxSum = 0;
  let line = 0;

  // start with row 0 as reference
  for (let j = 0; j < 10; j++) {
    maxSum = maxSum + matrix[0][j];
  }
  line = 0;

  // check other rows
  for (let i = 1; i < 10; i++) {
    let rowSum = 0;
    for (let j = 0; j < 10; j++) {
      rowSum = rowSum + matrix[i][j];
    }
    if (rowSum > maxSum) {
      maxSum = rowSum;
      line = i;
    }
  }

  console.log(
    "The biggest sum is in line " +
      line +
      " with sum " +
      maxSum
  );
}

// =======================================================

// Question 4

function zeroDivisible() {
  let size = 10;
  let matrix = [];
  let number = 0;

  // יצירת מטריצה עם מספרים עולים
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(number);
      number = number + 1;
    }
    matrix.push(row);
  }

  // איפוס מספרים שמתחלקים ב-5 או ב-7
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (
        matrix[i][j] % 5 === 0 ||
        matrix[i][j] % 7 === 0
      ) {
        matrix[i][j] = 0;
      }
    }
  }

  // הדפסה
  for (let i = 0; i < size; i++) {
    let line = "";
    for (let j = 0; j < size; j++) {
      line = line + matrix[i][j] + " ";
    }
    console.log(line);
  }
}

zeroDivisible();

// =======================================================

// Question 8

function layersMatrix() {
  let size = 10;
  let matrix = [];

  // יצירת מטריצה ריקה
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    matrix.push(row);
  }

  // מילוי שכבות
  let value = 1;
  let start = 0;
  let end = size - 1;

  while (start <= end) {
    // שורה עליונה
    for (let j = start; j <= end; j++) {
      matrix[start][j] = value;
    }
    // שורה תחתונה
    for (let j = start; j <= end; j++) {
      matrix[end][j] = value;
    }
    // עמודה שמאלית
    for (let i = start; i <= end; i++) {
      matrix[i][start] = value;
    }
    // עמודה ימנית
    for (let i = start; i <= end; i++) {
      matrix[i][end] = value;
    }

    // מעבר לשכבה פנימית
    value = value + 1;
    start = start + 1;
    end = end - 1;
  }

  // הדפסה
  for (let i = 0; i < size; i++) {
    let line = "";
    for (let j = 0; j < size; j++) {
      line = line + matrix[i][j] + " ";
    }
    console.log(line);
  }
}

layersMatrix();