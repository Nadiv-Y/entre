
// שאלה 8

let arr = [1,2,3,4,5,5,4,3,2,1]
function arrFolindrom(){
    let arrFinal = (arr.length) -1
    for (const arrItem of arr ){
        // console.log(arrItem , arr[arrFinal]); בדיקה
        
       if(arrItem === arr[arrFinal]){
        arrFinal--
       }else{
        console.log("The arr is not folindrom");
        return
       }

    } 
    console.log("The arr is folindrom");

}
arrFolindrom(arr)

