let boll = !true
let opp = !false
let x = 7


// console.log(boll);
// console.log(opp);
// console.log(x > 1);
// console.log(x > 8);
// console.log(x >= x);
// console.log(x < x);
// console.log(x === 7);
// console.log(x === '7');
// console.log(x == '7');
// console.log(x == 7);

let gender = 'female'
// let pensionAge = gender === 'female'
// console.log(pensionAge);

let pensionAge = gender === 'female' ? 62 : 68
console.log(pensionAge);

let num1 = 9
num2 = '9'

let somthing = num1 == num2 ? false : true

console.log(somthing);

// every value is truthly exept of:undefined, false, null, nan, 0
console.log(0 ? true : false);
console.log(false ? true : false);
console.log(undefined ? true : false);
console.log(null ? true : false);
console.log(NaN ? true : false);
console.log('string' ? true : false);
console.log('0' ? true : false);
console.log('' ? true : false);

console.log('======&&=====');
console.log(true && false);
console.log(true && 0);
console.log(true && undefined);
console.log(true && null);

console.log('======||=====');
console.log(true || 0);
console.log(0 || true);
console.log(false || true);
console.log(false || false);
console.log('' || false);
console.log(NaN || 0);








