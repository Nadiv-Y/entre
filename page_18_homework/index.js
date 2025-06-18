// Exercise no 1

function classifyNumber(num) {
  if (num < 0) {
    return `Negative`;
  } else if (num >= 0) {
    if (num > 0) {
      return `Positive`;
    } else {
      return `Zero`;
    }
  }
}

console.log(classifyNumber(-1));

// Exercise no 2

function increasing(num1, num2, num3) {
  if (num2 > num1) {
    if (num3 > num2) {
      return `Increasing`;
    }
  }
}

console.log(increasing(1, 2, 3));

// Exercise no 3

function biggestNum(num1, num2, num3) {
  if (num1 > num2) {
    if (num1 > num3) {
      console.log(`The biggest number is ${num1}`);
    }
  }

  if (num2 > num1) {
    if (num2 > num3) {
      console.log(`The biggest number is ${num2}`);
    }
  }

  if (num3 > num1) {
    if (num3 > num2) {
      console.log(`The biggest number is ${num3}`);
    }
  }
}

biggestNum(9, 4, 3);

// Exercise no 4

function digitCount(num) {
  if (num - 1000 > 0) {
    return `The ${num} contain 4 digit`;
  }
  if (num - 100 > 0) {
    return `The ${num} contain 3 digit`;
  }
  if (num - 10 > 0) {
    return `The ${num} contain 2 digit`;
  }
  if (num > 0) {
    return `The ${num} contain 1 digit`;
  }
}

console.log(digitCount(9999));

// Exercise no 5

function taxRate(name, salary) {
  const baseLine = 23000;
  const firstGap = 23000;
  const secondGap = 74000;
  const thirdGap = 100000;

  let tax = 0;
  let value = baseLine;
  let salaryGap = salary;

  if (salary < value) {
    tax += salaryGap * 0.1;
  } else {
    tax += baseLine * 0.1;
  }

  value += firstGap;
  salaryGap -= baseLine;

  if (salary < value) {
    tax += salaryGap * 0.2;
  } else {
    tax += firstGap * 0.2;
  }

  value += secondGap;
  salaryGap -= firstGap;

  if (salary < value) {
    tax += salaryGap * 0.3;
  } else {
    tax += secondGap * 0.3;
  }

  value += thirdGap;
  salaryGap -= secondGap;

  if (salary <= value) {
    tax += salaryGap * 0.4;
  } else {
    tax += thirdGap * 0.4;
  }

  salaryGap -= thirdGap;

  if (salary > value) {
    tax += salaryGap * 0.5;
  }

  return `${name} need to pay ${tax} tax`;

}

console.log(taxRate(`Dolev`, 221000));
