function add(num1, num2) {
    const res = num1 + num2
    return res
}

function sub(num1, num2) {
    const res = num1 - num2
    return res
}


function dev(num1, num2) {
    const res = num1 / num2;
}

function mult(num1, num2) {
    const res = num1 * num2
    return res
}

function square(num) {
    const res = mult(num, num)
    return res
}

function expo(num) {
    const res = mult(square(num),num)
    return res
}

let num = 10 
let div = num/2
let powerOf = 10**2
let modulo = 4
let resModulo = num % modulo
const resForOddOrEven = num % 2 // the abiliy to check if the nuber is odd or even

console.log(div);

let plusOne = num + 1
let plusAfter = num++
let plusBefor = ++num
console.log(plusAfter); // מוסיף אחד אחרי
console.log(plusAfter);

console.log(plusBefor); //מוסיף אחד לפני 

num +=1
console.log(num);

num +=2
console.log(num);

let res = expo(6)
console.log(res);

