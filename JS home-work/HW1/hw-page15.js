
// שאלה 1

function model(num1, num2, num3){
    console.log("הסכום הכולל",num1+ num2+ num3);
   console.log("ממוצע",(num1 + num2 +num3)/3);
}
model(12,25,69);

// שאלה 2 אורך ורוחב חדר מלבני
function room(hight, whidth){
    let Scope = (hight*2 )+ (whidth*2);
    let area = whidth*hight;
    console.log("The room Scope:", Scope, "The room area:", area);
}
room(500,896)

// שאלה 3 קוטר ועומק סיר
function PotDepthAndDiameter(dip ,diameter ){
   let  Capacity =3.14*((diameter/2)**2 )* dip ;
   return Capacity;
}
console.log("נפח הסיר", PotDepthAndDiameter(15,30),'סמ"ק' );

//שאלה 4 אורך סרט
function mediatime(minute){
  hour = Math.trunc(minute/60) ;
  linutes = minute% 60;
  console.log(hour ,"hour(s) and " ,linutes, "minute(s)");
}
mediatime(140)

// שאלה 5 מספר ימני למספר בן ארבע ספרות

function numRight(num) {
  let num_right = num % 10;
  return num_right ;
}
console.log(numRight(6459))
 
// שאלה 6 מספר שני מימין למספר בן ארבע ספרות

function numRight2(num) {
  let num_right = num % 100;
  return num_right ;
}
console.log(numRight2 (6457))

// שאלה 7 מספר תלת ספרתי ספרת המאות
function threeDigitNumber(num) {
  let hundredsDigit=  Math.trunc(num / 100);
  return hundredsDigit
}
console.log(threeDigitNumber(123))

// שאלה 8 מספר דו ספרתי סכום הספרות
function sum(num) {
  let numOne = num % 10;
  let numTow = Math.trunc(num/10);
  return numOne + numTow; 
}
console.log(sum(52))

// שאלה 9 מספר דו ספרתי החלפת הספרות
function sum2(num) {
  let numOne = num % 10;
  let numTow = Math.trunc(num/10);
 console.log((numOne*10)+numTow)  ; 
}
sum2(65)

// שאלה 10 מספר שלם זוגי גדול וקרוב 
function whole(num) {
  let numCeil = Math.ceil(num)
  let double = numCeil % 2 == 0 ? numCeil : numCeil+1
  return double
}
console.log(whole(64.5))


