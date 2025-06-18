const hous = "hous";
const store = "store";
const mall = "mall";
const office = "office";

function propTax(prop) {
  let tax;
  switch (prop) {
    case hous:
    case office:
      tax = 1000;
    //   break;
    case store:
      tax = 3200;
      break;
    case mall:
      tax = 500;
      break;

    default:
      tax = 564;
      break;
  }
  return tax;
}

console.log(propTax(hous)); // when i defiend argument the script run and check every word in the switch, if we have match the breake get the number out from the function and return it. if we don have any breake between them we get the tax value that come befor the break word.
console.log(propTax()); // when we dont define any value the function return us the defuelt tax velue = 564

function getNeto(salary) {
  let neto;
  let tenThousand = 10 ** 4;
  switch (true) {
    case salary <= tenThousand:
      neto = 0.87 * salary;
      console.log(21, neto, salary);
      return neto; // this is another option instade break
    //   break;
    case salary <= 2 * tenThousand:
      neto = 0.8 * salary;
      console.log(22, neto, salary);
      return neto;
    //   break;
    case salary <= 3 * tenThousand:
      neto = 0.7 * salary;
      console.log(23, neto, salary); // this row help you to debaging your code, always add a lot log's
      return neto;
    //   break;
    default:
      salary > 3 * tenThousand;
      neto = 0.6 * salary;
      console.log(24, neto, salary);
      return neto;
    //   break;
  }
  //   return neto;  this return is not necesry .
}

console.log("===");
console.log(getNeto(29000));
