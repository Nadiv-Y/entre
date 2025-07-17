// question 2
function numsBetween(num1, num2){
    for(let i = num1; i <= num2; i++){
        console.log(i); 
    }
}

console.log(numsBetween(3,10));


// question 3

function factorial(N){
    let result = 1;
    for(let i = 1; i <= N; i++){
        result = result * i;
    }
    if(N === 0)
        return 0;
    return result;
}

console.log(factorial(1));

// question 4
function divThree(N){
    let sum = 0;
    for(i = 0; i <= N; i++){
        if(!(i % 3))
            sum = sum + i;
    }
    return sum;
}

console.log(divThree(3));

// question 5
function sumThird(arr){
    let sum = 0;
    for(i = 2; i < 99; i += 3){
        sum += arr[i];
    }
    return sum;
}




