// question 8
function isPalin(arr){
    let i;
    let j;
    for(i = 0, j = (arr.length - 1); i < j; i++, j-- ){
        if(arr[i] != arr[j])        
            return false;
    }
    return true;
}

console.log(isPalin([2, 1, 4, 1, 2]));
