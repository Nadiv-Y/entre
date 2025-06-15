function firstQuestion(num1, num2, num3) {
  if (num1 < num2 && num1 < num3) {
    if (num2 < num3) {
      console.log(num1, num2, num3);
    } else {
      console.log(num1, num3, num2);
    }
  } else if (num2 < num1 && num2 < num3) {
    if (num1 < num3) {
      console.log(num2, num1, num3);
    } else {
      console.log(num2, num3, num1);
    }
  } else {
    if (num2 < num1) {
      console.log(num3, num2, num1);
    } else {
      console.log(num3, num1, num2);
    }
  }
}

function secondQuestion(grade) {
  if (grade >= 95) {
    console.log("מצוין");
  } else if (grade >= 85) {
    console.log("טוב מאוד");
  } else if (grade >= 75) {
    console.log("טוב");
  } else if (grade >= 65) {
    console.log("כמעט טוב");
  } else if (grade >= 55) {
    console.log("מספיק");
  } else {
    console.log("בלתי מספיק");
  }
}
function thirdQuestion(A, B, C, D, E, F) {
  let moneX = C * E - B * F;
  let moneY = A * F - C * D;
  let mehane = A * E - B * D;
  if (mehane === 0) {
    console.log("Equation has no solution");
  } else {
    console.log("x: ", moneX / mehane, " y: ", moneY / mehane);
  }
}
function fourthQuestion(year) {
  if (
    year % 4 === 0 &&
    (year % 100 !== 0 || (year % 100 === 0 && year % 400 === 0))
  ) {
    return "leap year";
  } else {
    return "regular year";
  }
}
function fifthQuestion(month, year) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31
    case 4:
    case 6:
    case 9:
    case 11:
      return 30
    default:
      if (fourthQuestion(year) === "leap year") {
        return 29
      }
      return 28
  }
}
