//question 1

function add(num1, num2, num3) {
    return num1 + num2 + num3;;
}

function avg(num1,num2,num3) {
    return (add(num1, num2, num3)/3);; 
}

//question 2

function area(width, length) {
    return width * length;
}

function peri(width, length) {
    return (width * 2) + (length * 2);
}

//question 3

function vol(diameter, height) {
    return (3.1416 * (diameter/2)**2 * height);
}

//question 4

function film(min) {
    return (min/60 - (min/60 % 1)) + " hour(s) and " + min % 60 + " minute(s)"
}

//question 5

function digOne(num) {
    return num % 10;
}

//question 6 

function digTen(num) {
    return ((num % 100) - digOne(num)) / 10;
}

//question 7 

function digHund(num){
    return (num - num % 100) / 100;
}

//question 8 

function sumDig(num){
    return (num - digOne(num)) / 10 + digOne(num);
}

//question 9

function swapDig(num){
    return digOne(num) * 10 + digTen(num);
}

// question 10

function nextEven(num){
    return ((num % 2) == 0 ? (num+2) : (++num));
}

//check 

console.log(nextEven(36));

