// שאלה 2 קליטת 2 שלמים והצגת השלמים שבינהם

function integer(num1, num2) {
    if (num1 < num2) {
       for(let i = num1 ; i <= num2; i++){
        console.log(i);
    }  
    }
    if (num2 < num1) {
         for(let i = num2 ; i <= num1; i++){
        console.log(i);
    }
    }
   
}
integer(26,5)

// שאלה 3 קליטת מספר מהמשתמש וחישוב העצרת

function factorialCalculation(num) {
    let n = num
    for (let i = num-1; i >= 1; i--){
       n*=i
    }
    console.log(n);
    
}
factorialCalculation(5)

// שאלה 4 הדפסת סכום המספרים מ1 עד... אשר מתחלקים ב3
function divisibleBy3(num) {
 let n = num;
 for(let i = 1; i <= n; i++){
    if (!(i%3)) {
        console.log(i)
    }
 }   
}
divisibleBy3(25)

// דרך נוספת
function divisibleBy3two(num) {
    let i = 1;
    while(i< num){
        if (!(i%3)) {
        console.log(i)
        }
        i++;
    }
    
}
divisibleBy3two(10);

// שאלה 5 קליטת 99 נתונים וסכימת כל מספר בכפולות 3
let numbers = [];
for (let i = 1; i < 100; i++) {
  numbers.push(i);
}
function amountDivisibleBy3(arr) {
let amont = 0;
for(const item of arr) {
    if(!(item%3)){
        amont += item;
    }
}
console.log(amont)
}

amountDivisibleBy3(numbers);

// דרך נוספת
let amont = 0;
for (let i = 0; i < 100; i++) {
   if (!(i%3)) {
    amont += i
   }
}
console.log(amont);
