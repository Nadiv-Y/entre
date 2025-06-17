// תרגיל 1 תנאי מקונן

function conditionPositiveNegative( num) {
    if (num>=0) {
    
        if (num == 0) {
            return "Zero"
        }
        return "Positive"
    }
    return "Negative"
}
console.log(conditionPositiveNegative(-8))

// תרגיל 2 קליטת 3 ערכים

function condition(num1, num2, num3) {
    if (num2>num1&&num3> num2) {
        return "Increasing"
    }
    return "Not Increasing"
}
console.log(condition(15,45,102));

// תרגיל  3 המספר הגדול ביותר
function numBig(num1, num2, num3) {
    switch (true) {
        case num1 >num2 &&num1 > num3:
            console.log(num1);
            
            break;
        case num2> num1 && num2 > num3:
              console.log(num2);
        break;
        default:console.log(num3);
            break;
    }
}
numBig(12, 54 ,57 )
// תרגיל 4 להציג מספר ספרות 
function digitsNumber(num) {
    switch (true) {
         case num < 10:
           console.log("Number of digits is 1");
            
            break;
        case num < 100:
           console.log("Number of digits is 2");
            
            break;
        case num < 1000:
            console.log("Number of digits is 3");
            break;
        default: console.log("Number of digits is 4");
            break;
    }

}
digitsNumber(4);

// תרגיל 5 מס הכנסה

function masincomeTax(name, salary) {
     let afterTax =0;
     let tax = 0 ;
    switch (true) {
        case salary<= 23000:
           afterTax =salary- (salary*0.1);
            tax = salary*0.1;
            break;
        case salary<= 46000:
            afterTax =salary- (salary*0.2);
              tax = salary*0.2;
            break;
        case salary<= 74000:
            afterTax =salary- (salary*0.3);
              tax = salary*0.3;
            break;
        case salary<= 100000:
            afterTax =salary- (salary*0.4);
              tax = salary*0.4;
            break;
    
        default:   afterTax =salary- (salary*0.5);
          tax = salary*0.5;
            break;
    }

    console.log("name:",name, "The amount you must pay to the income tax:", tax ,", Total salary after tax:" ,afterTax)
}
masincomeTax("Roni," , 120000);

