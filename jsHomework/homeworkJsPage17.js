
function growing(num1,num2){
     if(num2>num1)
     {console.log("growing")}
}



function valueCheck(num1, num2) {
  if (num2 >= num1) {
    return num2;
  } else {
    return num1;
  }
}

function evenOROdd(num){
return num%2==1? "odd" : "even";
}

function divisible(num1, num2){
return num1%num2==0 && num2%num1==0;
}


function bigger(num1, num2) {
  if (num1 > num2) {
    console.log(num2);
    console.log(num1);
  } else if (num1 < num2) {
    console.log(num1);
    console.log(num2);
  } else {
    return num1;
  }
}

function rise(name,salery){
  if (salery*1.1<6000)
  {
    return name + salery*1.1;
  }
  else
  return name + "יקבל משכורת בסכום" + salery*1.05;
}



