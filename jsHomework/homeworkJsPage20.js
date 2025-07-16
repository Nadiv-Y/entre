function howsBigger(num1, num2, num3) {
  if (num1 > num2 && num1 > num3 && num2 > num3) {
    return num1, num2, num3;
  } else if (num1 > num2 && num1 > num3 && num3 > num2) {
    return num1, num3, num2;
  } else if (num2 > num1 && num2 > num3 && num3 > num1) {
    return num2, num3, num1;
  } else if (num2 > num1 && num2 > num3 && num1 > num3) {
    return num2, num1, num3;
  } else if (num3 > num1 && num3 > num2 && num2 > num1) {
    return num3, num2, num1;
  } else if (num3 > num1 && num3 > num2 && num1 > num2) {
    return num3, num1, num2;
  } else if (num1 === num2 && num2 === num3) {
    return console.log(num1);
  }
}

function grade(studentName, grade) {
  if (grade < 55) {
    return console.log("בלתי מספיק");
  } else if (55 < grade < 65) {
    return console.log("מספיק");
  } else if (65 < grade < 74) {
    return console.log("כימעט טוב");
  } else if (75 < grade < 84) {
    return console.log("טוב");
  } else if (84 < grade < 94) {
    return console.log("טוב");
  } else if (95 < grade) {
    return console.log("טוב מאוד");
  }
}

function calculate(A, B, C, D, E, F) {
  if (A * E - B * D > 0) {
    let x = (C * E - B * F) / (A * E - B * D);
    let y = (A * F - C * D) / (A * E - B * D);
    return console.log("x" + "=" + x + "y" + "=" + y);
  } else console.log("Equation has no solution");
}

function leapYear(year) {
  if (!(year % 4)) {
    if (year % 100 || !(year % 400)) {
      return console.log("leap year");
    }
  }
}

function countdayscount(year, day) {
  if (
    day == 12 ||
    day == 10 ||
    day == 8 ||
    day == 7 ||
    day == 5 ||
    day == 3 ||
    day == 1
  ) {
    return console.log("this month has" + 31 + "days");
  } else if (day == 11 || day == 9 || day == 6 || day == 4) {
    return console.log("this month has" + 30 + "days");
  } else if (day == 2 && leapYear(year)) {
    return console.log("this month has" + 29 + "days");
  }
  console.log("this month has" + 28 + "days");
}
