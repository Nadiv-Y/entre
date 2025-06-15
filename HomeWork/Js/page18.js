function firstQuestion(number) {
  if (number < 0) {
    return "Negative";
  } else if (number === 0) {
    return "Zero";
  }
  return "Positive";
}

function secondQuestion(num1, num2, num3) {
  if (num1 < num2 && num2 < num3) {
    return "Increasing...";
  }
}
function thirdQuestion(num1, num2, num3) {
  if (num1 < num2 && num2 < num3) {
    return num3;
  } else if (num1 > num2 && num2 > num3) {
    return num1;
  }
  return num2;
}
function fourthQuestion(number) {
  if (number <= 9) {
    return 1;
  } else if (number <= 99) {
    return 2;
  } else if (number <= 999) {
    return 3;
  }
  return 4;
}
function fifthQuestion(salary) {
  let taxSum = 0;
  if(salary <= 23000){
    return 0.1*salary
  }
  salary -= 23000
  taxSum += 23000*0.1
  if(salary <= 23000){
    return taxSum + 0.2*salary
  }
  salary -= 23000
  taxSum += 23000*0.2
  if(salary <= 74000){
    return taxSum + 0.3*salary
  }
  salary -= 74000
  taxSum += 74000*0.3
  if(salary <= 100000){
    return taxSum + 0.4*salary
  }
  salary -= 100000
  taxSum += 100000*0.4
  return taxSum + salary*0.5
}