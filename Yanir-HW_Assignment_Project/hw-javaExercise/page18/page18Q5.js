
let bruto = 248000;


if (bruto <= 23000) {
    taxSum = bruto * 0.1;
}
else if (bruto <= 46000) {
    taxSum = ((bruto - 23000) * 0.2) + 2300;
}
else if (bruto <=120000) {
    taxSum = ((bruto - 46000) * 0.3) + 2300 + 4600;
}
else if (bruto <=220000) {
    taxSum = ((bruto - 120000) * 0.4) + 2300 + 4600 + 22200;
}
else {
    taxSum = ((bruto - 220000) * 0.5) + 2300 + 4600 + 22200 + 40000;
}


console.log(taxSum);
