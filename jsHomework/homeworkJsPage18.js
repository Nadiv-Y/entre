function sighCheck (val){
    if (vai<0){
        return "negative";
    }
    else if (val===0){
        return "zero";
    }
    else
    return "positive"}

function increacing(num1,num2,num3){
    if (num1>num3&&num3>num2)
    {return "Increacing"}
    }

function biggger(num1,num2,num3){
   if (num1===num2===num3)
   {return num1}
    else if (increacing(num1,num2,num3))
    {return num1}
    else if (increacing(num2,num1,num3))
    {return num2}
    else if (increacing(num3,num2,num1))
    {return num3}
    }

function digit(num){
    if(num>999){
        return "מספר ספרותיו הם"+ 4;
    }
    else if (num>99){
        return "מספר ספרותיו הם"+ 3;

    }
    else if (num>9){
       return "מספר ספרותיו הם"+ 2;

    }
    else {
       return "מספר ספרותיו הם"+ 1;

    }
}


let name ='Maoz Moshe Olamy' ,salery=80000000;
function taxes(name,salery){
    let saleryCount=salery 
    let tax=0 ;
    if(salery<=23000){
     tax=saleryCount*0.1;
     return  console.log( name + "צריך לשלם" + tax);
    }

    tax = 23000*0.1;
    saleryCount -= 23000;

    if(saleryCount<=23000){
     tax += saleryCount*0.2
     return console.log(name + "צריך לשלם" + tax);   
    }

    tax += 23000*0.2;
    saleryCount-=23000;

    if(saleryCount<=74000){
      tax += saleryCount*0.3;
      return  console.log(name + "צריך לשלם" + tax);
    }
    tax += (74000*0.3);
    saleryCount-=74000;

    if(saleryCount<=100000){
        tax += saleryCount*0.4;
        return console.log(name + "צריך לשלם" + tax);
    }

    tax += 100000 * 0.4;
    saleryCount -= 100000;

    tax += saleryCount * 0.5;
    
    return console.log( name + "צריך לשלם" + tax);
}

taxes(name, salery);