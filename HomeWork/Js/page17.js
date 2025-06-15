function firstQuestion(num1, num2) {
  console.log(num2 > num1 ? "Growing..." : "Not Growing...?");
}
function secondQuestion(num1, num2) {
  console.log(num2 > num1 ? num2 : num1);
}
function thirdQuestion(num) {
  console.log(num % 2 === 0 ? "Even" : "Odd");
}

function fourthQuestion(num1, num2) {
  console.log(
    num1 % num2 === 0
      ? "First num is dividable by the second num"
      : "First num is not dividable by the second num"
  );
  console.log(
    num2 % num1 === 0
      ? "second num is dividable by the First num"
      : "second num is not dividable by the First num"
  );
}
function fifthQuestion(num1, num2) {
  if (num2 < num1) {
    console.log(num2, num1);
  } else {
    console.log(num1, num2);
  }
}

function sixthQuestion(salary) {
  let newSalary = 1.1*salary
  if (newSalary > 6000){
    return salary*1.05
  }
  return newSalary
}

