function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mult(num1, num2) {
  return num1 * num2;
}

function squar(num) {
  return mult(num, num);
}

function expo(num, powerOf) {
  //   return mult(squar(num), num)
}

function greet() {
  console.log("hello world");
}

let res = add(255, 45);

res = res - sub(sub(45, 45), 30);

res = mult(1, 0);

const res1 = expo(2);

console.log(res);
console.log(res1);

greet();
