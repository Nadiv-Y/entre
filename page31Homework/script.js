// Question 2

function allNumbersBetween(startVal, endVal) {
  let num = startVal;
  while (num <= endVal) {
    console.log(num);
    num = num + 1;
  }
}

allNumbersBetween(1, 10);
allNumbersBetween(5, 13);
allNumbersBetween(100, 103);
allNumbersBetween(43, 56);
allNumbersBetween(-5, 2);
allNumbersBetween(4, 9);
allNumbersBetween(8, 12);
allNumbersBetween(78, 64);
allNumbersBetween(-2, -7);
allNumbersBetween(845, 850);
allNumbersBetween(76, 80);
allNumbersBetween(100, 98);
allNumbersBetween(0, 5);

// =======================================================

// Question 3

function factorial(n) {
  let s = 1;
  let i = 1;

  while (i <= n) {
    s = s * i;
    i = i + 1;
  }
  console.log(s);
}

factorial(1);
factorial(2);
factorial(3);
factorial(4);
factorial(5);
factorial(6);
factorial(7);
factorial(8);
factorial(9);
factorial(10);
factorial(11);

// =======================================================

// Question 4

function sumDivisibleBy3(n) {
  let s = 0;
  let i = 3;

  while (i <= n) {
    s = s + i;
    i = i + 3;
  }
  console.log(s);
}

sumDivisibleBy3(0);
sumDivisibleBy3(3);
sumDivisibleBy3(6);
sumDivisibleBy3(7);
sumDivisibleBy3(9);
sumDivisibleBy3(10);
sumDivisibleBy3(1);
sumDivisibleBy3(2);

// =======================================================

// Question 5

function sumEveryThird(start, end) {
  let s = 0;
  let i = start;

  while (i <= end) {
    if (i % 3 === 0) {
      s = s + i;
    }
    i = i + 1;
  }

  console.log(s);
}

sumEveryThird(1, 99);