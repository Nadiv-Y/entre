// Question 1

function isNumGrowing(num1, num2) {
  if (num2 > num1) {
    return "Growing..."
  }
}

console.log(isNumGrowing(5, 10))
console.log(isNumGrowing(2, 11))
console.log(isNumGrowing(11, 15))
console.log(isNumGrowing(88, 41))
console.log(isNumGrowing(862, 1523))
console.log(isNumGrowing(7422, 10))

// =======================================================

// Question 2

function theGreaterNumber(num1, num2) {
  if (num1 > num2) {
    return num1
  } else {
    return num2
  }
}

console.log(theGreaterNumber(5, 10))
console.log(theGreaterNumber(5, 15))
console.log(theGreaterNumber(5, 0))
console.log(theGreaterNumber(5, 5))

// =======================================================

// Question 3

function evenOrOddInt(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}
console.log(evenOrOddInt(5));
console.log(evenOrOddInt(10));
console.log(evenOrOddInt(0));
console.log(evenOrOddInt(-2));
console.log(evenOrOddInt(-3));

// =======================================================

// Question 4

function checkDivisibility(num1, num2) {
  if (num1 % num2 === 0) {
    console.log("The first number is divisible by the second")
  } else {
    console.log("The first number is not divisible by the second")
  }
  if (num2 % num1 === 0) {
    console.log("The second number is divisible by the first")
  } else {
    console.log("The second number is not divisible by the first")
  }
}

// =======================================================

// Question 5

function growingVal(num1, num2) {
  if (num1 < num2) {
    return `${num1} ${num2}`;
  } else if (num1 > num2) {
    return `${num2} ${num1}`;
  } else {
    return `${num1}`;
  }
}

console.log(growingVal(5, 2));
console.log(growingVal(1, 2));
console.log(growingVal(9, 2));
console.log(growingVal(1, 1));
console.log(growingVal(1025, 2547));

// =======================================================

// Question 6

function raise(name, currentSalary) {
  let newSalary;
  if (currentSalary * 1.1 <= 6000) {
    newSalary = currentSalary * 1.1;
  } else {
    newSalary = currentSalary * 1.05;
  }
  return `${name} will be paid ${newSalary.toLocaleString()}`;
}

console.log(raise('dan', 5000));
console.log(raise('ran', 6000));
console.log(raise('lan', 7000));