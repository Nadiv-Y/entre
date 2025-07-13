// programming-intro page 37

// 3.
function marksAvg(marks) {
  let sumStu01 = 0;
  let sumStu02 = 0;
  let sumStu03 = 0;
  let sumStu04 = 0;
  let sumStu05 = 0;
  let sumStu06 = 0;
  let sumStu07 = 0;
  let sumStu08 = 0;
  let sumStu09 = 0;
  let sumStu10 = 0;
  let sumSchool = 0;
  for (let i = 0; i <= 9; i++) {
    sumStu01 = sumStu01 + marks[i];
    sumStu02 = sumStu02 + marks[i + 10];
    sumStu03 = sumStu03 + marks[i + 20];
    sumStu04 = sumStu04 + marks[i + 30];
    sumStu05 = sumStu05 + marks[i + 40];
    sumStu06 = sumStu06 + marks[i + 50];
    sumStu07 = sumStu07 + marks[i + 60];
    sumStu08 = sumStu08 + marks[i + 70];
    sumStu09 = sumStu09 + marks[i + 80];
    sumStu10 = sumStu10 + marks[i + 90];
    sumSchool =
      sumSchool +
      marks[i] +
      marks[i + 10] +
      marks[i + 20] +
      marks[i + 30] +
      marks[i + 40] +
      marks[i + 50] +
      marks[i + 60] +
      marks[i + 70] +
      marks[i + 80] +
      marks[i + 90];
  }
  console.log("marks average of student 01 is " + sumStu01 / 10);
  console.log("marks average of student 02 is " + sumStu02 / 10);
  console.log("marks average of student 03 is " + sumStu03 / 10);
  console.log("marks average of student 04 is " + sumStu04 / 10);
  console.log("marks average of student 05 is " + sumStu05 / 10);
  console.log("marks average of student 06 is " + sumStu06 / 10);
  console.log("marks average of student 07 is " + sumStu07 / 10);
  console.log("marks average of student 08 is " + sumStu08 / 10);
  console.log("marks average of student 09 is " + sumStu09 / 10);
  console.log("marks average of student 10 is " + sumStu10 / 10);
  console.log("marks average of the School is " + sumSchool / 100);
}
// let marks = [
//   73, 80, 70, 80, 95, 98, 65, 76, 74, 88, 73, 80, 70, 80, 95, 98, 65, 76, 74,
//   88, 73, 80, 70, 80, 95, 98, 65, 76, 74, 88, 73, 80, 70, 80, 95, 98, 65, 76,
//   74, 88, 73, 80, 70, 80, 95, 98, 65, 76, 74, 88, 73, 80, 70, 80, 95, 98, 65,
//   76, 74, 88, 73, 80, 70, 80, 95, 98, 65, 76, 74, 88, 73, 80, 70, 80, 95, 98,
//   65, 76, 74, 88, 73, 80, 70, 80, 95, 98, 65, 76, 74, 88, 73, 80, 70, 80, 95,
//   98, 65, 76, 74, 88,
// ];
// marksAvg(marks);

// ==========================================

// 7.
function whollBetweenTen(tenWhollNumbers) {
    for(i = 0; i <= 8; i+=2){
        switch (true) {
            case tenWhollNumbers[i] < tenWhollNumbers[i + 1]:
                for(let n = tenWhollNumbers[i]; n <= tenWhollNumbers[i + 1]; n++){
                    console.log(n);
                }
                break;
        
            default:
                for(let n = tenWhollNumbers[i]; n >= tenWhollNumbers[i + 1]; n--){
                    console.log(n);
                }
                break;
        }
    }
    
}
// let tenWhollNumbers = [-5, 3, 11, 8, 0, 9, 9, -9, 2, 10]
// whollBetweenTen(tenWhollNumbers)