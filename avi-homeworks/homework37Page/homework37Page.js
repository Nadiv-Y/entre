console.log("=== Question 3 ===");

function calculateSchoolAverage() {
    let totalStudentAverages = 0;

    for (let student = 1; student <= 100; student++) {
        let studentGradesSum = 0;

        for (let grade = 1; grade <= 10; grade++) {
            let random = Math.floor(Math.random() * 101);
            studentGradesSum = studentGradesSum + random;
        }

        let studentAvg = studentGradesSum / 10;
        console.log("Average for student " + student + ": " + studentAvg);

        totalStudentAverages = totalStudentAverages + studentAvg;
    }

    let schoolAvg = totalStudentAverages / 100;
    console.log("School average: " + schoolAvg);
}

calculateSchoolAverage();




console.log("=== Question 4 ===");

function printDescendingSlices(N) {
    for (let i = 1; i <= N; i++) {
        let line = "";

        for (let j = i; j <= N; j++) {
            line = line + j + " ";
        }

        console.log(line);
    }
}

printDescendingSlices(4);

console.log("=== Question 5 ===");

function printShrinkingSlices(N) {
    for (let i = 1; i <= N; i++) {
        let line = "";
        for (let j = 1; j <= N - i + 1; j++) {
            line += j + " ";
        }
        console.log(line);
    }
}

printShrinkingSlices(4);