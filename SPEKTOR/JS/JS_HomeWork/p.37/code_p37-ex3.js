// JS_HomeWork/code_p37-ex3.js
/* Task:
בב״ס מסוים יש 100 תלמידים ולכל תלמיד 10 ציונים. הנתונים מסודרים בקלט לפי תלמידים דהיינו – 10 ציוני תלמיד ראשון, אח"כ 10 ציוני תלמיד שני וכו'. הדפס את ממוצע ציוניו של כל תלמיד וכן את ממוצע ביה"ס (ממוצע ביה"ס הוא ממוצע כל הציונים שנקלטו).

In a certain school, there are 100 students, and each student has 10 grades.
The data is arranged in the input by students — that is, the first 10 grades belong to the first student, then the next 10 to the second student, and so on.
Print the average grade of each student, as well as the school average(the school average is the average of all the grades entered).
*/

// Solution:
let totalStudents = 100;
let gradesPerStudent = 10;
let schoolSum = 0; 

for (let student = 1; student <= totalStudents; student++) {
    let studentSum = 0;

    for (let i = 0; i < gradesPerStudent; i++) {
        let grade = Math.floor(Math.random() * 35) + 66; 
        console.log(`Student ${student}, Grade ${i + 1}: ${grade}`);
        studentSum += grade;
        schoolSum += grade;
    }

    let studentAverage = studentSum / gradesPerStudent;
    console.log(`Student ${student} average: ${studentAverage.toFixed(2)}`);
}

let totalGrades = totalStudents * gradesPerStudent;
let schoolAverage = schoolSum / totalGrades;
console.log(`\nSchool average (ממוצע בית הספר): ${schoolAverage.toFixed(2)}`);


/* Code Explanation:

// Code to calculate the average grades of students in a school
// This code generates random grades for 100 students, each having 10 grades, and calculates both individual student averages and the overall school average.
// It uses a nested loop to iterate through each student and their grades, summing them up and calculating averages accordingly.
// The grades are randomly generated between 66 and 100, simulating a realistic grading scenario 



let totalStudents = 100; // Total number of students in the school
let gradesPerStudent = 10; // Each student has 10 grades
let schoolSum = 0; // Accumulates the total sum of all grades for the entire school

// Loop over each student
for (let student = 1; student <= totalStudents; student++) {
    let studentSum = 0; // Reset the sum of grades for the current student

    // Generate and sum up 10 random grades for this student
    for (let i = 0; i < gradesPerStudent; i++) {
        let grade = Math.floor(Math.random() * 35) + 66; // Generate a random grade between 66 and 100
        console.log(`Student ${student}, Grade ${i + 1}: ${grade}`); // Print each grade

        studentSum += grade;     // Add grade to student's total
        schoolSum += grade;      // Also add to school-wide total
    }

    // Calculate and print the average for the current student
    let studentAverage = studentSum / gradesPerStudent;
    console.log(`Student ${student} average: ${studentAverage.toFixed(2)}`);

    //.toFixed(2) - The toFixed method in JavaScript is used with numbers to format them to a specified number of decimal places. When you call number.toFixed(n), it returns a string representing the number rounded to n digits after the decimal point. 
    // For example, 3.14159.toFixed(2) will return "3.14".
}

// After looping through all students
let totalGrades = totalStudents * gradesPerStudent; // Total number of grades for the whole school
let schoolAverage = schoolSum / totalGrades; // Calculate the school average

// Print the final school average
console.log(`\nSchool average (ממוצע בית הספר): ${schoolAverage.toFixed(2)}`);

*/