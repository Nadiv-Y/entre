function thirdQuestion(studentsGrades) {
  let schoolAverageGrade = 0;
  let totalNumberOfGrades = 0;
  for (student in studentsGrades) {
    let studentAverageGrade = 0;
    for (grade in studentsGrades[student]) {
      studentAverageGrade += studentsGrades[student][grade];
      totalNumberOfGrades += 1;
    }
    schoolAverageGrade += studentAverageGrade;

    console.log(
      `Student number: ${parseInt(student) + 1} Average Grade: ${
        studentAverageGrade / studentsGrades[student].length
      }`
    );
  }
  console.log(
    `School's average Grades: ${schoolAverageGrade / totalNumberOfGrades}`
  );
}

function seventhQuestion(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let firstNumber = arr[i];
    let secondNumber = arr[i + 1];

    if(firstNumber === secondNumber)
      console.log(firstNumber);
      
    while(firstNumber !== secondNumber)
    {
      console.log(firstNumber);
      if(firstNumber< secondNumber)
        firstNumber++
      else
        firstNumber--
    }
  }
}

