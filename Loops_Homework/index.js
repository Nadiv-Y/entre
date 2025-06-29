// Page 31 section 1

// Exercise no 1

const arrOnehundred = [1, 2, 3, 4, 5];

let sumOfrOnehundred = 0;

for (let i = 0; i < arrOnehundred.length; i++) {
    sumOfrOnehundred += arrOnehundred[i];
}

console.log(sumOfrOnehundred)


// Exercise no 2

const arr = [4, 2, 2, 2, 2];

let sum = 0;

for (let i = 1; i < arr.length; i++) {
    sum += arr[i];
}

const avg = sum / arr[0];

console.log(avg);


// Exercise no 3

const arr2 = [1, 21, 3, 22, 300, 1, 3, 57, 90]

let max = 0;

for (let i = 0; i <= arr2.length; i++) {
    let input = arr2[i];

    if (input > max) {
        max = input
    }
}

console.log(max)

// Exercise no 4


// for(let i = 1; i <= 100; i++){
// console.log(`no .${i}`);
// }


// Page 31 section 2

// Exercise no 2

function twoDigitsGap(num1, num2) {

    for (let i = num1 + 1; i < num2; i++) {
        console.log(i)
    }

}

twoDigitsGap(2, 6)


// Exercise no 3

function factorial(n) {

    let factorialN = 1

    for (let i = 1; i <= n; i++) {
        factorialN *= i
    }

    console.log(factorialN);
}

factorial(5);


// Exercise no 4

function dividedByThree(num) {

    let count = 0

    for (let i = 1; i <= num; i++) {
        if (i % 3 === 0) {
            count += i
        }
    }

    console.log(count)
}

dividedByThree(7)


// Exercise no 5

const arr99 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

let sumThree = 0

for (let i = 0; i < arr99.length; i++) {
    if (arr99[i] % 3 === 0) {
        sumThree += arr99[i];
    }
}

console.log(sumThree)


// Page 37

// Exercise no 3

const grades = [54, 65, 23, 78, 70, 90, 54, 32, 46, 66, 78, 99, 100, 45, 32, 56, 17, 77, 88, 100]

const studentsAvgGrades = []

let studentSum = 0
let count = 0
let arrPosition = 0
let schoolSum = 0
let studentAvg = 0


for (let i = 0; i < grades.length; i++) {

    count += 1
    studentSum += grades[i]
    schoolSum += grades[i]

    if (count === 10) {
        studentAvg = studentSum / count;
        studentsAvgGrades[arrPosition] = studentAvg;
        arrPosition += 1
        count = 0
        studentSum = 0
    }

}

let schoolAvg = schoolSum / grades.length;

console.log(`The school avargae score is ${schoolAvg} and the students average scores are ${studentsAvgGrades}`)


// Exercise no 7

const gapArr = [9, 12, 8, 8, 12, 12, 14]

let currentNum = 0
let previousNum = gapArr[0]


for (let i = 0; i < gapArr.length; i++) {

    currentNum = gapArr[i]

    if (currentNum !== previousNum) {
        console.log(previousNum)
        if (currentNum > previousNum) {
            for (let i = previousNum + 1; i < currentNum; i++) {
                console.log(i)
            }
        }
        if (previousNum > currentNum) {
            for (let i = previousNum - 1; i > currentNum; i--) {
                console.log(i)
            }
        }
    }
    if (currentNum === previousNum && previousNum !== gapArr[0]) {
        console.log(currentNum)
    }

    previousNum = gapArr[i]
}

console.log(currentNum)


// Page 48

// Exercise no 8 -- Try Again

const polindrom = [1,2,2,2,2,2,2,2,2,1]



function checkIfPolindrom(arr) {
    let reversePolindrom = []
    let originalPolindrom = []

    for (let i = 0; i < polindrom.length; i++) {
        originalPolindrom += polindrom[i]
    }

    for (let i = polindrom.length - 1; i >= 0; i--) {
        reversePolindrom += polindrom[i]
    }

    if (reversePolindrom === originalPolindrom) {
        return `polindrom`;
    } else {
        return `no polindrom`;
    }
}

console.log(checkIfPolindrom(polindrom))


// Exercise no 1







