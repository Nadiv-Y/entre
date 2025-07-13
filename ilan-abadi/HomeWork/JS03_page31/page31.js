// programming-intro page 31

// 2.
function allWhollNum(num1, num2) {
    switch (true) {
        case num1 < num2:
            for(let i = num1; i<=num2; i++){
                console.log(i);
            }
            break;
    
        default:
            for(let i = num1; i>=num2; i--){
                console.log(i);
            }
            break;
    }
}
// allWhollNum(0, -4)


// ==========================================


// 3.
function findNFact(N) {
    let s = 1
    for(let i = 1; i <= N; i++){
        s = s * i
    }
    console.log('!' + N +' = '+ s);
}
// findNFact(5)


// ==========================================


// 4.
function sumOfDivByThree(N) {
    let sum = 0
    for(i = N; i>=1; i--){
        if (i % 3 === 0) {
            sum = sum + i
        }
    }
    console.log('The sum of all numbers divided by 3 between 1 and ' + N + ' is ' + sum);
}
// sumOfDivByThree(7)


// ==========================================


// 5.
let arr = []//כאן יש 99 נתונים
let sum = 0
for (i = 2; i <= 99; i+=3){
    sum = sum + arr[i]
}
console.log(sum);

//כאן בדקתי שזה עובד עם 6 נתונים
// let arr = [19, 18, 21, -10, 0, -12]
// let sum = 0
// for (i = 2; i <= 6; i+=3){
//     sum = sum + arr[i]
// }
// console.log(sum);



