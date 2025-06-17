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

  if (salary <= baseLine) {
    tax = salary * 0.1;
  }

  if (salary > firstGap) {
    let firstSalaryGap = salary - baseLine;
    console.log(firstSalaryGap)
    tax = baseLine * 0.1 + firstSalaryGap * 0.2;
    console.log(tax)

    if (salary > baseLine + firstGap) {
      let secondSalaryGap = salary - baseLine - firstGap;
      tax = tax + secondSalaryGap * 0.3;
        console.log(tax)

      if (salary > baseLine + firstGap + secondGap) {
        let thirdSalaryGap = salary - baseLine - firstGap - secondGap;
        tax = tax + thirdSalaryGap * 0.4;
            console.log(tax)


        if (salary > baseLine + firstGap + secondGap + thirdGap) {
          let forthSalaryGap = salary - baseLine - firstGap - secondGap - thirdGap;
          tax = tax + forthSalaryGap * 0.5;
                console.log(tax)

        }
      }
    }
  }

  return `${name} need to pay ${tax} tax`;
}

console.log(taxRate(`Dolev`, 47000));
