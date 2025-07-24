
let inputs = [2,4,6,6,4,2,0,4,4,9];

// for ( let i = 0; i <= 9; i++) {
//     inputs[i] = Math.floor(Math.random() * 10);

    
// }



for (let i = 0; i <= 8; i++) {
  
let min = Math.min(inputs[i], inputs[i + 1]);
let max = Math.max(inputs[i], inputs[i + 1]);

// console.log(inputs[i], inputs[i+1], min, max);
// console.log([inputs[i]])
  if (inputs[i] < inputs[i + 1])
    for (let j = min; j < max; j++)
      // if (inputs[i] < inputs[i + 1])
          // console.log([inputs[i+1]]);
          console.log([j]);
    
  else if(inputs[i] > inputs[i + 1])
    for (let k = max; k > min; k--)
        //  console.log([inputs[i-1]]);
         console.log([k]);
      
  else (console.log(inputs[i]));
  
}
console.log(inputs[9]);


// let output = []

// for (let i = 0; i <= 8; i++) {

//   switch (true) {
//     case inputs[i] < inputs[i +1]:
//       output = inputs[i]
      
//       break;
  
//     default:
//       break;
//   }
    
// }



  // if (inputs[i] < inputs[i + 1]) {
  //   output = inputs[i] + 1
  //   console.log(inputs[i] + 1);
  // }
  // else if (inputs[i] > inputs[i + 1]){
  //   output = inputs[i] - 1
  //   console.log(inputs[i]);
  // }