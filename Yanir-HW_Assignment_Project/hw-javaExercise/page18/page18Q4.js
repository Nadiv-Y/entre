
let num1 = 4;



if ((num1 / 1000) > 1) {
    output = '4 digits';
}
else if ((num1 / 100) > 1) {
    output = '3 digits';
}
else if ((num1 / 10) > 1) {
    output = '2 digits';
}

else {
    output = '1 digit'
}


console.log(output);
