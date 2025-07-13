// programming-intro page 49
// 1.
// בשלושה שלבים
// פונקציה שיוצרת מערך של מספרים עוקבים עם מספר התחלתי וגודל מערך לבחירה
function makeSeqNumArr(startNum, arrayLength) {
  const arr = []
  for(let i = 0; i < arrayLength; i++){
    arr[i] = startNum + i
  }
  return arr
}
// console.log(makeSeqNumArr(0, 10));

// פונקציה שיוצרת את המערך המתאים לכל שורה במטריצת המספרים העוקבים
function makeLinesForSeqNumMatrix(lineNumber, startNum, arrayLength) {
  arr = makeSeqNumArr(startNum, arrayLength)
  for(let i = 0; i < arrayLength; i++){
    arr[i] = arr[i] + lineNumber * arrayLength
  }
  return arr
}
// console.log(makeLinesForSeqNumMatrix(5, 0, 10));

// והפונקציה שלשמה התכנסנו שיוצרת מטריצה של מספרים עוקבים
// המספר ממנו מתחילים וגודל המטריצה נתון לבחירה
function makeSeqNumMatrix(startNum, matrixSize) {
  const seqNumMatrix = []
  for(let i = 0; i < matrixSize; i++){
    seqNumMatrix[i] = makeLinesForSeqNumMatrix(i, startNum, matrixSize)
  }
  console.log(seqNumMatrix);
}
// makeSeqNumMatrix(0, 10)


// ==========================================

// 2.
// בשלושה שלבים - קודם יצרתי שתי פונקציות עזר

// פונקציה שיוצרת מערך באורך לבחירה שבו כל התווים שווים לתו שנבחר
function makeArray(num, arrayLength) {
  let arr = [];
  for (let i = 0; i < arrayLength; i++) {
    arr[i] = num;
  }
  return arr;
}
// console.log(makeArray(0, 10));

//הפונקציה שיוצרת את המערך המתאים לכל שורה במטריקס האיקס
function makeLineForBigX(arrayLength, lineNumber, numInBackground, numOfX) {
  let arr = makeArray(numInBackground, arrayLength);
  for (let i = 0; i <= lineNumber; i++) {
    arr[i] = numOfX;
    arr[arrayLength - (i + 1)] = numOfX;
  }
  for (let i = lineNumber; i >= 0; i--) {
    if (arr[i - 1] === numOfX) {
      arr[i - 1] = numInBackground;
      arr[arrayLength - i] = numInBackground;
    }
  }
  return arr;
}
// console.log(makeLineForBigX(5, 2, 0, 1));

// הפונקציה לשמה התכנסנו יוצרת האיקס הגדול במערך
// ניתן לבחור את גודל המערך התו ברקע והתו באיקס
function makeBigX(arrayLength, numInBackground, numOfX) {
    const matrixWithX = []
    for(let i = 0; i < arrayLength; i++){
        makeLineForBigX(arrayLength, i, numInBackground, numOfX)
    }
    for(let i = 0; i < arrayLength; i++){
        matrixWithX[i] = makeLineForBigX(arrayLength, i, numInBackground, numOfX)
    }
    for(let i = 0; i < arrayLength; i++){
        matrixWithX[arrayLength - (1 + i)] = matrixWithX[i]
    }
    return matrixWithX
}


// ==========================================


// 3.
// שוב יצרתי שתי פונקציות עזר

// פונקציה שמוצאת מה המספר הכי גדול במערך
function whoIsGreater(anyArr) {
    let greaterSum = anyArr[0] 
    for(let i = 1; i < anyArr.length; i++){
        if (anyArr[i] > greaterSum) {
            greaterSum = anyArr[i]
        }
    }
    return greaterSum
}
// const arr = [30, 700, 22, 43, 22, 50, 80, 120, 5000, 97]
// console.log(whoIsGreater(arr));

// פונקציה שמחשבת סכום מספרים במערך
function sumOfArrItems(anyArr) {
    const arr = anyArr
    let sumOfArr = 0
    for (key in arr){
        sumOfArr += arr[key]
    }
    return sumOfArr
}

// בפונקציה שלשמה התכנסנו הוספתי ניסוח תשובה נוסף למקרה שהסכום הכי גדול מופיע ביותר משורה אחת
function LineWithGreatestSum(matrix) {
    
    let sqLength = matrix[0].length * matrix[0].length
    let sum = 0
    
    for (let i = 0; i < sqLength; i++){
        sumOfArrItems(matrix[i])
    }

    let listOfSums = makeArray(0, matrix.length)
    for (let i = 0; i < matrix.length; i++){
        listOfSums[i] =  sumOfArrItems(matrix[i])
    }
    console.log("The Greatest sum is");
    let counter = 0
    for(let key in listOfSums){
      if(listOfSums[key] == whoIsGreater(listOfSums)){
        counter = counter + 1
        if(counter > 1){
          console.log("and");
        }
        let line = parseInt(key) + 1
        console.log("in line " + line);
      }
    }
}

// const dataMatrix = [
//   [1, 70, 2, 4, 2, 5, 8, 12, 70, 10],
//   [43, 70, 2, 4, 2, 5, 8, 12, 500, 9],
//   [3, 70, 2, 14, 2, 5, 8, 12, 400, 9],
//   [28, 75, 2, 4, 2, 15, 8, 12, 500, 9],
//   [3, 70, 2, 4, 2, 5, 8, 12, 500, 9],
//   [58, 70, 2, 4, 2, 5, 8, 12, 35, 9],
//   [12, 77, 2, 4, 2, 5, 8, 12, 9, 1],
//   [3, 70, 2, 203, 2, 5, 8, 12, 500, 9],
//   [5, 71, 2, 4, 2, 5, 8, 12, 500, 9],
//   [70, 70, 2, 4, 2, 5, 8, 12, 97, 9]
// ];

// const dataMatrix = [
//   [1, 70, 2, 4, 2, 5, 8, 12, 70, 10],
//   [43, 70, 2, 4, 2, 5, 8, 12, 500, 9],
//   [3, 70, 2, 14, 2, 5, 8, 12, 400, 9],
//   [28, 75, 2, 4, 2, 15, 8, 12, 500, 9],
//   [3, 70, 2, 4, 2, 5, 8, 12, 500, 9],
//   [58, 70, 2, 4, 2, 5, 8, 12, 35, 9],
//   [12, 77, 2, 4, 2, 5, 8, 12, 9, 1],
//   [3, 70, 2, 203, 2, 5, 8, 12, 500, 9],
//   [5, 71, 2, 4, 2, 5, 8, 12, 500, 9],
//   [70, 70, 2, 4, 2, 5, 8, 12, 97, 9],
//   [3, 70, 2, 203, 2, 5, 8, 12, 500, 9]
// ];

// LineWithGreatestSum(dataMatrix)

// ==========================================

// 4.
// כיוון שאנחנו לא יודעים לבצע פעולות על מטריצה הכנתי למערך
// פונקציה שמחליפה בזד כל מספר במערך שמתחלק באיקס או בוואי
function ifDivByXOrYInArrMakeZ(x, y, z, arr) {
  let newArr = []
  for(let key in arr){
    newArr[key] = arr[key]
    if(arr[key] % x == 0 || arr[key] % y == 0){
      newArr[key] = z
    }
  }
  return newArr
}
// const testArr = [1, 15, 12, 8, 17, 21, 0, 210]
// console.log(ifDivByXOrYInArrMakeZ(4, 3, 666, testArr));


// ואז הפעלתי אותה על כל מערך במטריצה
function ifDivByXOrYInMatrixMakeZ(x, y, z, matrix) {
  let matrixSize = matrix[0].length
  let newMatrix = []
  for(let i = 0; i < matrixSize; i++){
    newMatrix[i] = ifDivByXOrYInArrMakeZ(x, y, z, matrix[i])
  }
  console.log(newMatrix);
}
// const dataMatrix = [
//   [1, 70, 2, 4, 2, 5, 8, 12, 70, 10],
//   [43, 70, 2, 4, 2, 5, 8, 12, 500, 9],
//   [3, 70, 2, 14, 2, 5, 8, 12, 400, 9],
//   [28, 75, 2, 4, 2, 15, 8, 12, 500, 9],
//   [3, 70, 2, 4, 2, 5, 8, 12, 500, 9],
//   [58, 70, 2, 4, 2, 5, 8, 12, 35, 9],
//   [12, 77, 2, 4, 2, 5, 8, 12, 9, 1],
//   [3, 70, 2, 203, 2, 5, 8, 12, 500, 9],
//   [5, 71, 2, 4, 2, 5, 8, 12, 500, 9],
//   [70, 70, 2, 4, 2, 5, 8, 12, 97, 9],
//   [3, 70, 2, 203, 2, 5, 8, 12, 500, 9]
// ];

// ifDivByXOrYInMatrixMakeZ(5, 7, 0, dataMatrix)
// ==========================================

// 8.
//שוב בגלל שאנחנו לא יודעים לעבוד על מטריצה
// יצרתי פונקציה שיוצרת את השורה המתאימה
// נעזרתי בפונקציה שיוצרת מערך משאלה 2
function makeLinesForFrameMatrix(lineNumber, arrayLength, startNum) {
  const arr = makeArray(startNum, arrayLength)
  for(let i = 0; i <= lineNumber; i++){
    for(let key in arr){
      if(key >= i && key <= (arrayLength - (i + 1))){
        arr[key] = startNum + i
        arr[arrayLength - (i + 1)] = arr[key]
      }
    }
  }
  return arr
}
// makeLinesForFrameMatrix(2, 10, 1)

// וזוהי הפונקציה לשמה התכנסנו
// בנוסף למה שביקשו היא יודעת ליצור מטריצת מסגרות מגודל מטריצה ומספר במסגרת החיצונית שנבחר
function makeFrameMatrix(numInOuterFrame, matrixSize) {
  const frameMatrix = []
  for(let i = 0; i < matrixSize; i++){
    frameMatrix[i] = makeLinesForFrameMatrix(i, matrixSize, numInOuterFrame)
  }
  for(let i = 0; i < matrixSize; i++){
    frameMatrix[matrixSize - (i + 1)] = frameMatrix[i]
  }
  console.log(frameMatrix);
}
// makeFrameMatrix(1, 10)