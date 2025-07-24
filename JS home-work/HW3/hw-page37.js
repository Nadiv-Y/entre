
// שאלה 3 קליטת 1000 ציונים והדפסת ממוצע

// שלב א -יצירת מערך שבתוכו 100 מערכים (למאה תלמידים) ובכל מערך 10 ציונים רנדומלים לכל תלמיד.
let arrgread = []
for (let i = 0; i <100; i++) {
    arrgread.push([]) 
        for(let g = 0 ; g < 10 ; g++){
            arrgread[i].push(Math.trunc(Math.random()* 51 +50))}
}
console.log(arrgread);
// שלב ב - ממוצע ציוניו של כל תלמיד
function averagePerStudent(arr) {
    for (let i = 0 ; i <arr.length ; i++){
        let sum = 0;
        let internalArrayLength = 0
        for (let g = 0; g < arr[i].length; g++){
        sum += arr[i][g]  
        internalArrayLength = arr[g].length  
        }
        console.log(`ממוצע תלמיד ${i+1} =  ${sum/internalArrayLength}`) 
    }
    
}
averagePerStudent(arrgread)
// שלב ג- ממוצע כל ציוני תלמידי בית הספר
function averageOfAllStudents(arr) {
   let sum = 0;
   let internalArrayLength = 0 
   for (let i = 0; i < arr.length; i++) {
    for (let g = 0; g < arr[i].length; g++) {
        sum += arr[i][g]
        internalArrayLength = g
    }
    
   }
   let arrLength = arr.length
   let SumArrLength   = arrLength*internalArrayLength
   console.log(`ממוצע כל תלמידי בית הספר:${Math.trunc(sum / SumArrLength)} `)
}
averageOfAllStudents(arrgread)
 

// שאלה 7

let arr3 = []
for(let i =0 ; i< 10 ; i++){
arr3.push(Math.trunc(Math.random() *100 +1))
}
console.log(arr3);



function wholeNumbers(arr) {
    for(const number in arr){
    // console.log(arr[number]);
        
        let number2 = parseInt(number)+1
              
        if(arr[number] > arr[ number2]){
            // console.log(arr[number],  arr[ number2]);

            
            for(let i = arr[ number2] ; i <= arr[number] ; i++){
                
                console.log(i , 1);
                
            }
        }
      
        if( arr[ number2]> arr[number] ){
            // console.log(arr[number] ,  arr[ number2]);
            for(let i = arr[number] ; i <=  arr[ number2] ; i++){
                console.log(i, 2) ;
                
            }
        }
    }

    
}
wholeNumbers(arr3 )