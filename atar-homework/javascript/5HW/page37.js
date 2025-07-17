// question 3
function schoolAvg(students){
    let studentTotal = 0; 
    let schoolTotal = 0; 
    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 10; j++){
            studentTotal += students[i].grades[j];
        }
        console.log(students[i].name + "'s average is ");
        console.log(studentTotal/10);
        schoolTotal += studentTotal;
        studentTotal = 0;
    }
    console.log( "the school average is " + schoolTotal/(100 * 10));
}

// const students = [
//  {
//     name: "Dany",
//     grades: [85, 90, 78, 92, 88, 76, 95, 89, 84, 91]
//   },
//   {
//     name: "Sharon",
//     grades: [70, 65, 80, 75, 82, 79, 88, 90, 84, 86]
//   },
//   {
//     name: "Yossi",
//     grades: [95, 97, 96, 92, 94, 91, 93, 98, 97, 96]
//   }
// ]

// console.log(schoolAvg(students));

// question 7
function numBetween(arr){
    let result = "";
    for(let i = 0; i < 10; i++){
        if(arr[i] <= arr[i + 1]){
            for(let j = arr[i]; j < arr[i + 1]; j++){
                result += j + ",";
            }
        }
        else{
            for(let j = arr[i]; j >= arr[i + 1]; j--)
                result += j + ",";
        }
        console.log(result);
    }
    return result;
}

const arr = [1, 4, 5, 7, 9, 7, 7, 8, 11, 9];

console.log(numBetween(arr));


