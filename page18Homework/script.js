// Question 1

function checkNumberSign(num) {
  if (num > 0) {
    return "Positive";
  } else if (num === 0) {
    return "Zero";
  } else return "Negative";
}

console.log(checkNumberSign(10));
console.log(checkNumberSign(0));
console.log(checkNumberSign(-10));

// =======================================================

// Question 2

function isIncreasing(num1, num2, num3) {
  if (num2 > num1 && num3 > num2) {
    return "Increasing...";
  }
}

console.log(isIncreasing(1, 2, 3));
console.log(isIncreasing(9, 5, 2));
console.log(isIncreasing(5, 6, 1));
console.log(isIncreasing(6, 5, 9));
console.log(isIncreasing(1, 2, 1));
console.log(isIncreasing(8, 5, 0));

// =======================================================

// Question 3

function theLargestValue(val1, val2, val3) {
  if (val1 >= val2 && val1 >= val3) {
    return `${val1} is the largest value`;
  } else if (val2 >= val1 && val2 >= val3) {
    return `${val2} is the largest value`;
  } else return `${val3} is the largest value`;
}

console.log(theLargestValue(1, 3, 3));
console.log(theLargestValue(63, 2, 3));
console.log(theLargestValue(5, 256, 5));
console.log(theLargestValue(75, 7, 3));
console.log(theLargestValue(152, 2, 3));
console.log(theLargestValue(1, 6, 125));
console.log(theLargestValue(14, 62, 13));
console.log(theLargestValue(7, 852, 586));
console.log(theLargestValue(3, 3, 3));

// =======================================================

// Question 4

function numOfDigits(num) {
  if (num >= 1 && num <= 9999) return String(num).length;
}

console.log(numOfDigits(123456789));
console.log(numOfDigits(129));
console.log(numOfDigits(1589));
console.log(numOfDigits(1238));
console.log(numOfDigits(123456789));
console.log(numOfDigits(12345678));
console.log(numOfDigits(1239));
console.log(numOfDigits(1));
console.log(numOfDigits(189));

// =======================================================

// Question 5

function taxPayment(employee, income) {
  let tax = 0;

  if (income <= 23000) {
    tax = income * 0.1; // מדרגת מס 1
  } else if (income <= 74000) {
    tax = 23000 * 0.1 + (income - 23000) * 0.2; // מדרגת מס 2
  } else if (income <= 100000) {
    tax =
      23000 * 0.1 +
      (74000 - 23000) * 0.2 +
      (income - 74000) * 0.3; // מדרגת מס 3
  } else if (income <= 200000) {
    tax =
      23000 * 0.1 +
      (74000 - 23000) * 0.2 +
      (100000 - 74000) * 0.3 +
      (income - 100000) * 0.4; // מדרגת מס 4
  } else {
    tax =
      23000 * 0.1 +
      (74000 - 23000) * 0.2 +
      (100000 - 74000) * 0.3 +
      (200000 - 100000) * 0.4 +
      (income - 200000) * 0.5; // מדרגת מס 5
  }
  return `${employee} pays ${tax} ILS in taxes`;
}
console.log(taxPayment("avi", 10000));
console.log(taxPayment("gavi", 100000));
console.log(taxPayment("shavi", 150000));
console.log(taxPayment("davi", 63000));
console.log(taxPayment("mavi", 22000));
console.log(taxPayment("lavi", 10000));
console.log(taxPayment("tavi", 18000));
console.log(taxPayment("ravi", 220000));
console.log(taxPayment("pavi", 23000));
