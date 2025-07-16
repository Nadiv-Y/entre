
function avarge(num1,num2,num3){
   const res= (num1+num2+num3) / 3
    return res;
}

function malben(a,b){
const ResArea = a*b
const ResScope = a*2+d*2 
return ResArea, ResScope;
}

function potSize (height,diameter){
const res= (diameter/2)*(diameter/2)*height*3.14
return res
}

function movieTime(num){
let res=  (num%60)+(num-((num%60)*60))
return res;
}

function findFirstDigit(num){
let res=  (num-((num%10)*10))
return res;
}

function findSecoundDigit(num){
let res=  (num-((num%100)*10)-(num-((num%10)*10)))
return res;
}

function findThirdDigit(num){
let res=  num%100
return res;
}

function findDigitSum(num){
let res=  (num-((num%100)*10)+(num-((num%10)*10)))
return res;
}

function findSwitchDigit(num){
let res=  ((num-((num%100)*10)/10)+((num-((num%10)*10))*10))
return res;
}


function findBigger(num){
let res=  (num+2)%(num+2)
return res;
}

