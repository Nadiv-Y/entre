function firstQuestion(arr) {
  let count = 0
  let columns = 10
  for(let i = 0; i<columns; i++){
    let rows = 10
    let tempArr = []
    for (let j = 0; j < rows; j++) {
      tempArr.push(count)
      count += 1      
    }
    arr.push(tempArr)
  }
  return arr
}
console.log(firstQuestion([]));
