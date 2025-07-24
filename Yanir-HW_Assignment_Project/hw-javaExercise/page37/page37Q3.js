
let grid = [];

for ( let student = 0; student <= 99; student++) {
    grid[student] = [];
    // console.log(grid);
    

    for (let grade = 0; grade <=9; grade++) {
        grid[student][grade] = Math.floor(Math.random() * 100);
        // grid[student][grade] = 6;
        
        // console.log(grid[student][grade]);
        
    }

}
console.log(grid);

let avgs = [];

for (let student = 0; student < 100; student++) {
  let sum = 0;

  for (let grade = 0; grade < 10; grade++) {
    sum += grid[student][grade];
  }

  avgs[student] = sum / 10;
}


console.log("Student Averages: ", avgs); 


let totAvg = [];
let totSum = 0;
for (let student = 0; student < 100; student++) {
  

  for (let grade = 0; grade < 10; grade++) {
    totSum += grid[student][grade];
  }

  totAvg = totSum / 1000;
}

console.log("The Entire School Average is: ",totAvg); 
