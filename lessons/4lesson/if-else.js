const tenThousand = 10 ** 4;

let salary = 3 * tenThousand;
let tax;

// if (salary <= tenThousand) {
//   tax = 0.17;
// }else if (salary <= 2 * tenThousand) {
//   tax = 0.2;
// } else if (salary <= 3 * tenThousand) {
//   tax = 0.3;
// } else {
//     tax = 0.4
// }



// function getNetoValue(salary) {
//   if (salary <= tenThousand) {
//     return salary * 0.83;
//   }
//   if (salary <= 2 * tenThousand) {
//     return salary * 0.8;
//   }
//   if (salary <= 3 * tenThousand) {
//     return salary * 0.65;
//   }
//     return salary * 0.55;
// }

let gross = 3.2 * tenThousand
let neto = getNetoValue(gross)

console.log(neto);

