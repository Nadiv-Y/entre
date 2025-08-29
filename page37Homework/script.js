// Qesution 3

function schoolAverages(numStudents, numGrades) {
  let schoolSum = 0; //סכום ציונים של בית הספר

  let i = 1; //מונה תלמידים
  while (i <= numStudents) {
    let studentSum = 0; //סכום ציונים של תלמיד נוכחי

    let j = 1; //מונה ציונים
    while (j <= numGrades) {
      let z =
        Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      studentSum = studentSum + z;
      schoolSum = schoolSum + z;

      j = j + 1; //קפיצה לציון הבא
    }

    let studentAverage = studentSum / numGrades; //ממוצע ציונים לתלמיד
    console.log(
      `The average of student ${i} is ${studentAverage.toFixed(
        2
      )}`
    );

    i = i + 1; //קפיצה לתלמיד הבא
  }

  let schoolAverage = schoolSum / (numStudents * numGrades);
  console.log(
    `School's average is ${schoolAverage.toFixed(2)}`
  );
}

schoolAverages(100, 10);

// =======================================================

// Question 7

const numbers = [9, 12, 8, 5, 7, 3, 15, 6, 2, 11];

console.log(numbers[0]);

for (let i = 0; i < numbers.length - 1; i++) {
  const from = numbers[i];
  const to   = numbers[i + 1];

  if (from < to) {
    for (let k = from + 1; k <= to; k++) {
      console.log(k);
    }
  } else if (from > to) {
    for (let k = from - 1; k >= to; k--) {
      console.log(k);
    }
  } else {
  }
}