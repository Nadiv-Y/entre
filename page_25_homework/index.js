
// Exercise no 1

function toTop(topNum){
    let i = 1;
    while(i <= topNum){
        console.log(i);
        i++;
    }
}

toTop(12);


// Exercise no 2

function showNumbersBetween(num1, num2){
    if(num1 < num2){
        let i = num1;
        while(i <= num2){
            console.log(i);
            i++;
        }
    } else {
        let i = num2;
        while(i <= num1){
            console.log(i);
            i++;
        }
    }
}

showNumbersBetween(2, 4)


// Exercise no 3

function evenNumbers(n){
    if(n %  2 === 0){
        let i = 0;
        while(i <= n){
            console.log(i);
            i += 2
        }
    } else {
        let i = 0;
        while(i < n){
            console.log(i);
            i += 2
        }
    }
}

evenNumbers(3);

// Exercise no 4

function dividedInDen(max, den){
    let i = 0
    while(i <= max){
        if(i % den === 0){
            console.log(i)
        }
        i++
    }

}

dividedInDen(8, 2)

console.log('=================')

// Exercise no 5

function negativeNumbers(number){
    let sum = 0;
    let num = number;

    while(num !== -99){
        if(num > 0){
            sum += num;
        }
    }

    return sum;
}

console.log(negativeNumbers([12,12,-99]))


// Exercise no 6

