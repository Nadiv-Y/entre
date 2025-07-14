// page15

// // 1
// let a=1
// let b=1
// let c=1

// let sum = a+b+c;
// let avg = sum/3;
// console.log(avg);


// // 2
// let length = 2;
// let width = 2;
// let size=length * width;
// let pre= 2*(length + width);
// console.log(pre);


// // 3
// let radios = 10;
// let depth = 2;
// const pie = 3.14;
// let potSize = pie * 1/2 * radios ^2;
// let volume = potSize * depth;
// console.log(volume);

// // 4
// let lengthMin = 90;
// let PartTime = lengthMin % 60;
// let Hour = (lengthMin-PartTime) / 60;
// console.log('The movie is', Hour, 'and', PartTime, "minutes");


// // 5
// let x = 1239;
// let answer5 = x % 10;
// console.log(answer5);

// // 6
// let y = 9999;
// let divide = y % 100;
// let divide2 = divide / 10;
// let answer6 = divide2 - (divide2 % 1)
// console.log(answer6);


// //7
// let z = 123;
// let OneHundred = z/100;
// let mudelo = OneHundred - (OneHundred % 1);
// console.log(mudelo);

// //8
// let question8 = 23;
// let q = question8 % 10;
// let w= (question8 - q)/10;
// let answer8 = q + w;
// console.log(answer8);

// //9
// let question9 = 47;
// let e = (question9 % 10) * 10;
// let r = (question9 - (question9%10))/10;
// console.log(e+r);

// //10
// let question10 = 6.2;
// let no = question10 - question10 % 1; 
// let answer10 = ((no % 2) > 0) ? no + 1 : no + 2;
// console.log("question 10", answer10);

//--------------------------------------------------------------//

// // page17
// //1
// let a = 10;
// let b = 2;
// let answer1 = ( b > a ) ? true : false ;
// console.log(answer1);

// //2
// let answer2 = ( a > b ) ? a : b ;
// console.log(answer2);

// //3
// let answer3 = ((a % 2) > 0 ) ? "odd" : "even" ;
// console.log(answer3);

// //4
// let answer4 = ((a % b) > 0 && (b % a) > 0) ? true : false;
// console.log(answer4);

// //5 
// let answer5 = (a > b) ? {a,b}  : {b,a} ;
// console.log("answer 5: ", answer5); 

// //6
// let name = "Dor";
// let salary = 1000;
// let bonus = (salary + salary*0.1 > 6000) ? salary*0.05+ salary : salary*0.1+salary;
// console.log(bonus);

//------------------------------------------------------------------------------------------//

//page 18
//1
// let a = -4;

// if (a > 0){
//     console.log("positive");
//     }
//     else if ( a = 0 ){
//         console.log("zero");
//         }
//         else {
//             console.log("negative");
            
//         }


// //2
// let b = 1;
// let c = 2;
// let answer2 = b > a && c > b ? true : false;
// console.log(answer2);

// //3  
// let answer3= a > b && a > c && a || b > a && b > c && b ||  c;
// console.log(answer3);

// //4
// let x = 234;
// let answer4 = x > 0 && x < 10 && 1 || x >= 10 && x < 100 && 2 || x > 100 && x < 1000 && 3 || x >= 1000 && 4
// console.log(answer4);

//5
// let employee = "Nir"
// let salary = 432000
// let tax
// let first =  23000 * 0.10
// let second = 23000 * 0.20
// let third =  74000 * 0.30
// let forth = 100000 * 0.4

// if (salary <= 23000){
//     tax = salary * 0.1
// }
// else if (23000 < salary && salary <= 46000){
//     tax = first + ((salary-23000)*0.2)
    
// }
// else if (46000 < salary && salary <= 120000){
//     tax = first + second + ((salary-46000)*0.3)
// }
// else if (120000 < salary && salary <= 220000){
//     tax = first + second + third + ((salary-120000)*0.4)
// }
// else{
//     tax = first + second + third + forth + ((salary-220000)*0.5);
// }

// console.log(employee, "will pay ", tax, " tax for his salary ", "(", salary, ")");

//------------------------------------------------------------------------------------------//

// //page 20
// //1
// let x
// let answer1 = x % 3 < 0 || x % 5 < 0 ? true : false;

// //page 21
// //1
// let h = 5
// let j = 1
// let k = 3

// if(h < j && j < k){
//       console.log(h,j,k)
// }
// else if (j < h && h < k){
//     console.log(j,h,k);
    
// }

// else if (h < k && k < j){
//     console.log(h, k, j);
    
// }

// else if (j < k && k < h){
//     console.log(j,k,h);
    
// }
// else if (k < h && h < j){
//     console.log(k,h,j);
    
// }
// else {
//     console.log(k,j,h);
    
// }

// //2
// let grade = 99

// if(grade < 55 ){
//       console.log("not enough")
// }
// else if (grade > 55 && grade < 64){
//     console.log("enough");
    
// }

// else if (grade > 65 && grade < 74){
//     console.log("almost good");
    
// }

// else if (grade > 75 && grade < 84){
//     console.log("good");
    
// }
// else if (grade > 85 && grade < 94){
//     console.log("very good");
    
// }
// else {
//     console.log("excellant");
    
// }


// //3
// let a = 1
// let b = 2
// let c = 4
// let d = 6
// let e = 8
// let f = 1

// if (a*e-b*d === 0){
//     console.log("Equation has no solution");
    
// }
// else{
//     let x = (c*e - b*f) / a*e-b*d;
//     let y = (a*f- c*d) / a*e-b*d;
//     console.log("x:", x, "y", y);
    
// }


// //4
// let shana  = 2002
// let answer = shana % 4 === 0 && (shana % 100 > 0  || shana % 400 === 0 )? "meobert" : "regila"
// console.log(answer);

// //5
// let month = 2

// if (month === 1 || month === 3|| month === 5||month === 7||month === 8||month === 10||month === 12){
//     console.log("There are 31 days in this month");
    
// }
// else if (month === 4||month === 6||month === 9||month === 11){
//     console.log("There are 30 days in this month");
    
// }else if (month === 2 && answer === "meobert"){
//     console.log("There are 29 days in this month");
// }

// else{
//     console.log("There are 28 days in this month");
// }

//--------------------------------------------------------------//

//page 31
// //2
// let firstNumber =2
// let secondNumber = 10

// for (let i=firstNumber; i<secondNumber+1; i++){
//     //console.log(i);
    
// }

// //3
// let n = 5
// let z = 1
// //1*2*3*4*5
// for (i = 1; i <= n; i++) {
//     z = z*i;
    
//        }
//  console.log('answer 3:' , z);

//  //4

// for (n > 1; n--;) {
//     if (n % 3 === 0) {
//     console.log(n)
          
//     }
// }

// //5 
// number = 0;
// let array = new Array (99);

// for (let index = 0; index < array.length; index++) {
//     if ((index+1) % 3 ===0){
//         number = array[index] + number;
//     }
    
     
// }
//  console.log('answer5:', number);

//--------------------------------------------------------------//

//page 37
//3
// let students=[
//     [5,5,5],
//     [3,3,3],
//     [4,4,4],
//     [1,1,1],
//     [2,2,2],
//     [6,6,6],
//     [8,8,8],
//     [1,1,1],
//     [9,9,9],
//     [2,2,2]
// ]
   
//     let allMeans = 0;
    

// for (let student = 0; student<students.length; student++){
//     studentGrade = students[student] ;
//     // console.log("this is student grade" , studentGrade);
   
//     let sumGrade = 0;

// for (let i = 0; i < studentGrade.length; i++) {
//     sumGrade = studentGrade[i] + sumGrade;
   
    
// }
// let mean =  sumGrade/studentGrade.length;
//  console.log("The Mean of each student ", mean);
// allMeans = mean + allMeans;

// }
// let answer3 = (allMeans/ students.length);
// console.log("Class Mean is:", answer3);


    
//7
// let array = [1,7,3,5,10,2,8,4,9,6];
// let result = [];

// for (let i = 0; i<array.length; i++){
// if (array[i] < array[i+1]){
//     for (let number = array[i]; number < array[i+1]; number++)
//           result.push(number);

// } else {
//     for (number = array[i]; number > array[i+1]; number--)
//           result.push(number);

// }
// }

// console.log("question 7:", result.join(", "));


//page 48
//8
let matPoli =[1,2,7,8,2,2,8,7,2,10]
size = 10;
let polindrom

//option1
// for (let i = 0; i < size; i++){
//     // matPoli[i]= Math.floor(Math.random() * (max - min + 1)) + min;

//     if ((matPoli[0] === matPoli[9]) && (matPoli[1] === matPoli[8]) && (matPoli[2] === matPoli[7]) && (matPoli[3] === matPoli[6]) &&(matPoli[4] === matPoli[5])){
//         polindrom  = "polindrom!"
                    
//     } else {
//         polindrom ="no polindrom"
        
//     }
// }


//option 2
for (let i = 0; i < size/2; i++){
    if (matPoli[i] !== matPoli[(size-1-i)]){
     polindrom = false;
     break
} else{
    polindrom = true;
}
}

    polindrom = polindrom ? "polindrom!" : "not polindrom :("
    console.log(matPoli);
    console.log(polindrom);


//page 49
//1
let size = 10;
let mat = [];
let number = 0;

for (let i = 0; i < size; i++) {
  mat[i] = []; 

  for (let j = 0; j < size; j++) {
    mat[i][j] = number;
    number++
  }

}
console.log("question1:" , mat);


//2
let secondMat = [];
number = 0;

for (let i = 0; i < size; i++) {
  secondMat[i] = []; 
    

  for (let j = 0; j < size; j++) {
    if (j === i || j === (size-i-1)){
    secondMat[i][j] = 1;
  } else {
    secondMat[i][j] = 0;
  }
   
  }

}
console.log("question2:",secondMat);


//3
let thirdmat = [];
let sumOFRow = 0
let arrOfSum = [];
let largestLocation = 0;
//סכום השורה
for (let i = 0; i < size; i++) {
  thirdmat[i] = []; 

  for (let j = 0; j < size; j++) {
    thirdmat[i][j] = Math.floor(Math.random() * 100);
    sumOFRow = thirdmat[i][j] + sumOFRow;
     
      }

arrOfSum.push(sumOFRow);

for (let x = 0; x > 10; x++){
    if (arrOfSum[x] > arrOfSum[x+1]){
        largestLocation = x;
        arrOfSum[x+1] = arrOfSum[x];
        console.log(largestLocation);
         
    }
}


console.log(largestLocation);
console.log(arrOfSum);

}



          
  
  
 

// //4

// let forthdmat = [];

// for (let i = 0; i < size; i++) {
//   forthdmat[i] = []; 

//   for (let j = 0; j < size; j++) {
//     forthdmat[i][j] = Math.floor(Math.random() * 100);
    
    
//         if ((forthdmat[i][j] % 5 === 0) ||(forthdmat[i][j] % 7 === 0) ){
//     (forthdmat[i][j] = 0);
// }
// }   
//   }

// console.log("question4:",forthdmat);

// //8
// let matEight = [];

// for ( i = 0; i < size; i++){
//     matEight[i] = [];

//     for ( j = 0; j < size; j++){
//         if(i === 0 || i === 9 || j === 0 || j === 9){
//             matEight[i][j] = 1;
//             }if ((j > 0) && (j < 9) && i>0 && i < 9){
//             matEight[i][j] = 2;
//             } if ((j > 1) && (j < 8) && i > 1 && i < 8){
//             matEight[i][j] = 3;
//             }if ((j > 2) && (j < 7) && i > 2 && i < 7){
//             matEight[i][j] = 4;
//             }if ((j > 3) && (j < 6) && i > 3 && i < 6){
//             matEight[i][j] = 5;
//             }
//        } 
//     }

//     console.log('question8:' ,matEight);














