
let sum1, sum2;


function length(houers){
     sum1 = (houers - houers % 60) / 60;
     sum2 = houers - 60 * sum1;

    return sum1, sum2;
}

 let HrMin = length (170);



console.log(sum1,'Hour(s)', sum2 , 'Minute(s)');

