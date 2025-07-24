
let num = 9;
let sum = 0;

for (let i = 1; i <= 99; i++) {
 num = Math.floor(Math.random() * 100) + 1;
 console.log(num);
 
if (i % 3 === 0)
  sum = sum + num
}

console.log(sum);
