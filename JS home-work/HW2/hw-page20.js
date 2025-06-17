// תרגיל 1 הצגת ערכים מהקטן לגדול
function numFromLargestToSmallest(num1, num2, num3) {

    switch (true) {
        case num1 > num2 && num2 > num3:
            console.log(num3, num2, num1);
            
            break;
        case num2 > num3 && num3 > num1:
            console.log(num1, num3, num2);
            
            break;
        case num3 > num1 && num1 > num2:
            console.log(num2, num1, num3);
            
            break;
        case num3 > num2 && num2 > num1:
            console.log(num1, num2, num3);
            
            break;
        case num1 > num3 && num3 > num2:
            console.log(num2, num3, num1);
            
            break;
 
    
        default:  console.log(num3, num1, num2);
            break;
    }
    
}
numFromLargestToSmallest(555,2105,469);

// תרגיל 2 ציונים לתעודה

function numScore(num) {
    switch (true) {
        case num < 55:
            return "בלתי מספיק";
            
        case num == 55|| num <= 64:
            return "מספיק";
            
        case num <= 74:
            return "כמעט טוב"
            
        case num <= 84:
            return"טוב";    
        
        case num <= 94:
            return "טוב מאוד";
            
        default: 
        return "מצוין"
           
    }
}

console.log(numScore(92))

// תרגיל 3 פתירת משוואה
function equation(a, b,c,d,e,f) {
    if ((a*e)-(b*d) == 0) {
        return "Equation has solution"
    }
    let x =( (c*e)-(b*f))/( (a*e)-(b*d))
    let y =(( (a*f)-(c*d))/( (a*e)-(b*d)))
    return `x = ${x.toFixed(2)} y = ${y.toFixed(2)}`
    
}
console.log(equation(1,52,4,5,69,84));
// תרגיל 4 קליטת שנה והצגה האם היא מעוברת
function year(year) {
    if (year%4 == 0 && year %100 !== 0 || year%4 == 0 && year% 100 == 0 && year%400 == 0 ){
      return "שנה מעוברת"
    }
    return "שנה רגילה"
  
}
console.log(year(2004));

// תרגיל 5 מספר ימים בחודש

function numDayInMonth(numMonth , year) {
    switch (true) {
        case numMonth === 1:
            return(`num days in month 1: 31`) 

     case numMonth === 2:
        if (year%4 == 0 && year %100 !== 0 || year%4 == 0 && year% 100 == 0 && year%400 == 0 ){
            return (`num day in month 2: 29`)
        }
        return (`num day in month 2: 28`)      
          
     case numMonth === 3:
            return(`num days in month 3: 31`)
            
     case numMonth === 4:
            return(`num days in month 4: 30`)

     case numMonth === 5:
            return(`num days in month 5: 31`)
         
     case numMonth === 6:
            return(`num days in month 6: 30`)
           
     case numMonth === 7:
            return(`num days in month 7: 31`)
           
     case numMonth === 8:
            return(`num days in month 8: 31`)
           
     case numMonth === 9:
            return(`num days in month 9: 30`)
           
     case numMonth === 10:
            return(`num days in month 10: 31`)
           
     case numMonth === 11:
           return(`num days in month 11: 30`)

     case numMonth === 12:
           return(`num days in month 12: 31`)
            
    
        default:"נא להכניס ערכים תקינים"
            break;
    }
}
console.log(numDayInMonth(2, 2025))
