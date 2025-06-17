//  תרגיל 1 קליטת 2 ערכים  והצגת אם השני גדול מהראשון

function numGrow(num1, num2) {
    if (num2>num1){
        return "Growing" ;
        
    }
    return "Not Growing"
}
console.log(numGrow(25, 55));
 
//  תרגיל 2 קליטת 2 ערכים הצגת הגדול

function numBig(num1,num2) {
  switch (true) {
    case num1 > num2:
        console.log(num1);
        
        break;
  
    default:
        console.log(num2);
        
        break;
  }
    
}
numBig(25,277)

// תרגיל 3 מספר זוגי או לא

function numDoubleOrNo(num) {
    if (num % 2 === 0){
        return "Even"
    }
    return "Odd"
}

console.log( numDoubleOrNo(56));
// תרגיל  4 חילוק 2 מספרים אחד בשני ללא שארית

function divisionNum(num1, num2) {
    switch (true) {
        case num1% num2 == 0:
             console.log(num1 ,"is divisible by", num2 ,"without a remainder" )
            break;
    
        default:  console.log(num1 ,"is not divisible by", num2 ,"without a remainder" )
            break;
    }
    switch (true) {
        case num2% num1 == 0:
             console.log(num2 ,"is divisible by", num1 ,"without a remainder" )
            break;
    
        default:  console.log(num2,"is not divisible by", num1 ,"without a remainder" )
            break;
    }
}

divisionNum(20 ,5)
//  תרגיל 5 קליטת 2 ערכים הצגת הגדול ואח"כ הקטן

function numSmall(num1 , num2) {
   
    if (num1 < num2){
      let num1Small= [num1, num2]
       return  num1Small;
        
    }
    let num2Small = [num2, num1]
    return  num2Small;
   
}
 
console.log(numSmall(82,82));

//  תרגיל 6- אתגר בעל בית תוכנה

function plus10percent(name, salary) {
    if (salary + (salary*0.1) <= 6000){
        let salaryPlus10= {
            name: name,
            salary: salary +(salary*0.1),
        }
        return salaryPlus10;
    }
    if (salary + (salary*0.1) > 6000){
        let salaryPlus5= {
            name: name,
            salary: salary +(salary*0.05),
        }
          return salaryPlus5;
    }

}
console.log(plus10percent("Israel" ,5000 ));

