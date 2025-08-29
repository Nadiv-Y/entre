// Question 1

function ascendingValue(val1, val2, val3) {
  let a = val1;
  let b = val2;
  let c = val3;

  if (a > b) {
    let temp = a;
    a = b;
    b = temp;
  }

  if (a > c) {
    let temp = a;
    a = c;
    c = temp;
  }

  if (b > c) {
    let temp = b;
    b = c;
    c = temp;
  }

  return `${a}, ${b}, ${c}`;
}

console.log(ascendingValue(3, 2, 1));
console.log(ascendingValue(1, 3, 2));
console.log(ascendingValue(1, 2, 3));
console.log(ascendingValue(9, 4, 7));

// =======================================================

// Question 2

function studentsVerbalGrade(grade) {
  if (grade >= 95) {
    return `מצוין`;
  } else if (grade >= 85) {
    return `טוב מאוד`;
  } else if (grade >= 75) {
    return `טוב`;
  } else if (grade >= 65) {
    return `כמעט טוב`;
  } else if (grade >= 55) {
    return `מספיק`;
  } else return `בלתי מספיק`;
}

console.log(studentsVerbalGrade(100))
console.log(studentsVerbalGrade(95))
console.log(studentsVerbalGrade(90))
console.log(studentsVerbalGrade(80))
console.log(studentsVerbalGrade(75))
console.log(studentsVerbalGrade(73))
console.log(studentsVerbalGrade(68))
console.log(studentsVerbalGrade(66))
console.log(studentsVerbalGrade(60))
console.log(studentsVerbalGrade(59))
console.log(studentsVerbalGrade(55))
console.log(studentsVerbalGrade(45))
console.log(studentsVerbalGrade(26))
console.log(studentsVerbalGrade(18))
console.log(studentsVerbalGrade(1))

// =======================================================

// Question 3

function solveEquations(A, B, C, D, E, F) {
  let denominator = A * E - B * D;
  if (denominator === 0) {
    return `"Equation has no solution"`;
  }

  let x = (C * E - B * F) / denominator;
  let y = (A * F - C * D) / denominator;
  return `x = ${x}, y = ${y}`;
}

console.log(solveEquations(1, 2, 3, 4, 5, 6));
console.log(solveEquations(12, 23, 54, 56, 89, 87));
console.log(solveEquations(5, 5, 6, 4, 3, 1));
console.log(solveEquations(2, 4, 5, 1, 2, 3));
console.log(solveEquations(7, 8, 9, 6, 5, 4));
console.log(solveEquations(5, 5, 6, 4, 3, 1));
console.log(solveEquations(6, 9, 8, 4, 6, 2));

// =======================================================

// Question 4

function isLeapYear(year) {
  if (year % 400 === 0) {
    return `Leap year`;
  } else if (year % 100 === 0) {
    return `Not leap year`;
  } else if (year % 4 === 0) {
    return `Leap year`;
  } else return `Not leap year`;
}

console.log(isLeapYear(1983))
console.log(isLeapYear(1955))
console.log(isLeapYear(1566))
console.log(isLeapYear(2003))
console.log(isLeapYear(2004))
console.log(isLeapYear(2026))
console.log(isLeapYear(1943))

// =======================================================

// Qustion 5

function numOfDaysInMonth(month, year) {
  if (month === 1) {
    return `Number of days in month is 31`;
  } else if (month === 2) {
    if (year % 400 === 0) {
      return `Number of days in month is 29`;
    } else if (year % 100 === 0) {
      return `Number of days in month is 28`;
    } else if (year % 4 === 0) {
      return `Number of days in month is 29`;
    } else return `Number of days in month is 28`;
  } else if (month === 3) {
    return `Number of days in month is 31`;
  } else if (month === 4) {
    return `Number of days in month is 30`;
  } else if (month === 5) {
    return `Number of days in month is 31`;
  } else if (month === 6) {
    return `Number of days in month is 30`;
  } else if (month === 7) {
    return `Number of days in month is 31`;
  } else if (month === 8) {
    return `Number of days in month is 31`;
  } else if (month === 9) {
    return `Number of days in month is 30`;
  } else if (month === 10) {
    return `Number of days in month is 31`;
  } else if (month === 11) {
    return `Number of days in month is 30`;
  } else if (month === 12) {
    return `Number of days in month is 31`;
  }
}

console.log(numOfDaysInMonth(1, 1996));
console.log(numOfDaysInMonth(1, 1926));
console.log(numOfDaysInMonth(2, 1993));
console.log(numOfDaysInMonth(6, 1969));
console.log(numOfDaysInMonth(1, 1973));
console.log(numOfDaysInMonth(4, 1916));
console.log(numOfDaysInMonth(5, 1548));
console.log(numOfDaysInMonth(2, 2006));
console.log(numOfDaysInMonth(1, 4562));
console.log(numOfDaysInMonth(1, 1996));
console.log(numOfDaysInMonth(8, 2048));
console.log(numOfDaysInMonth(4, 1996));
console.log(numOfDaysInMonth(3, 2368));
console.log(numOfDaysInMonth(2, 2018));
console.log(numOfDaysInMonth(1, 2047));
console.log(numOfDaysInMonth(12, 1996));