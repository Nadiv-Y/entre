const HOUSE = "house";
const STORE = "store";
const MALL = "mall";
const OFFICE = "office";

function propTax(prop) {
  console.log(prop);
  let tax;
  switch (prop) {
    case STORE:
      tax = 3200;
      console.log(tax);
    case HOUSE:
    // break
    case OFFICE:
      tax = 1000;
      console.log(tax);

    // break

    case MALL:
      tax = 543453;
      break;
    default:
      tax = 564;
      break;
  }

  return tax;
}

console.log(propTax(HOUSE));

const TEN_THOUSAND = 10 ** 4;

function getNeto(salary) {
  let neto;
  switch (true) {
    case salary <= TEN_THOUSAND:
      neto = 0.87 * salary;
      console.log(21, neto, salary);
      return neto
    case salary <= 2 * TEN_THOUSAND:
      neto = 0.8 * salary;
      console.log(22, neto, salary);
      return neto;
    case salary <= 3 * TEN_THOUSAND:
      neto = 0.7 * salary;
      console.log(23, neto, salary);
    default:
      neto = 0.6 * salary;
      console.log(24, neto, salary);
      return neto;
  }

  
}

console.log(getNeto(29000));
