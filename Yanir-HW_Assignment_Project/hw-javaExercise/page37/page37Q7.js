
let inputs = [2,4,6,6,4,2,0,4,4,9];




for (let i = 0; i <= 8; i++) {
  
let min = Math.min(inputs[i], inputs[i + 1]);
let max = Math.max(inputs[i], inputs[i + 1]);

  if (inputs[i] < inputs[i + 1])
    for (let j = min; j < max; j++)
          console.log([j]);
    
  else if(inputs[i] > inputs[i + 1])
    for (let k = max; k > min; k--)
         console.log([k]);
      
  else (console.log(inputs[i]));
  
}
console.log(inputs[9]);

