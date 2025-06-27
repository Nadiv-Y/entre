function secondQuestion(num1, num2) {
  let lower = Math.min(num1, num2);
  let higher = Math.max(num1, num2);

  for (lower; lower <= higher; lower++) {
    console.log(lower);
  }
}

function thirdQuestion(N) {
  let multSum = 1;
  for (N; N > 0; N--) {
    multSum *= N;
  }
  console.log(multSum);
}

function FourthQuestion(N) {
  let sum = 0;
  for (N; N > 0; N--) {
    if (N % 3 === 0) sum += N;
  }
  console.log(sum);
}
function fifthQuestion(arr) {
  let sum = 0;
  for (let i = 2; i < arr.length; i += 3) sum += arr[i];
  console.log(sum);
}
