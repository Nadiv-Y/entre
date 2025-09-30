// const arr = [1, 2, 3, 4, 5, 6, 45, 78, 62, 45, 95, 81, 444, 255, 2, 55, 46];

// const arrMap = arr.map((item) => {
//   return item < 100 ? (item = 0) : item;
// });
// console.log(arrMap);

// const arry = [{ company: "Osem", product: "Bamba" },
//     { company: "Tara", product: "Milk" },
//     { company: "Elit", product: "Chocolate" },
//     { company: "Maya", product: "Candy" }

// ];

// const nowArry = []
// arry.forEach((key, obj)=> {
//  nowArry.push(obj.company= 'Osem' || "Tara"? {...obj , }):
// })

// שאלה 2
// const arry = [1,2,3,4,5]
// const arryFilter = arry.filter((num)=>{
//    return !(num % 2)
// })

// const arryReduce = arry.reduce((accumulator, corentvalue)=>{

// if(!(corentvalue%2)){
//     accumulator.push(corentvalue)
// }
// return accumulator
// },[])

// console.log(arryFilter);
// console.log(arryReduce);

// שאלה 4

// const arry = [{ company: "Osem", product: "Bamba" },
//     { company: "Tara", product: "Milk" },
//     { company: "Elit", },
//     { company: "Maya", product: "Candy" }

// ];
// const every = arry.every((obj)=>
//    obj.product
// )
// const some = arry.some((obj)=>
//    obj.product
// )
// console.log(every); // false
// console.log(some); // true

// const xs = [1, NaN, 3];

// const resIndxOf = xs.indexOf(NaN)
// const resIncludes = xs.includes(NaN)

// console.log(resIndxOf); // -1
// console.log(resIncludes);// true

// //שאלה 6

// const a = [1,2,3,4];

// const slice = a.slice(2,3)
// const splice =a.splice(2,1)

// console.log(slice);//[3]
// console.log(splice);// [3]
// console.log(a); // [1,2,4]

// const arrStr=[10,2,1]

// arrStr.sort().reverse()
// console.log(arrStr);// [1, 10, 2] =>  [2, 10, 1]

// const arrStr2=[10,2,1]

// arrStr.sort((num1, num2)=>{num1 > num2? 1 : -1})
// console.log(arrStr2);// [10, 2, 1]

// arrStr.sort((num1, num2)=>{num1 > num2? -1 : 1})
// console.log(arrStr2);// [1,2,10]

// const str = ['é','e','ê']

// str.sort()
// console.log(str);//['e', 'é', 'ê']

// const str2 = ['é','e','ê']

// str2.sort().reverse()
// console.log(str2);//['ê', 'é', 'e']

// const arry3 = [1,2,3,4,5,6,7,8,9,10]

// console.log(arry3.push(2));
// console.log(arry3);

// console.log(arry3.pop());
// console.log(arry3);

// console.log(arry3.shift());
// console.log(arry3);

// console.log(arry3.unshift(1,22));
// console.log(arry3);

//שאלה 10
// const orders = [
//     {product:'Shos' ,price: 55 ,available: true },
//     {product:'Car' ,price: 45 ,available: false },
//     {product:'Computer' ,price: 1000 ,available: true },
//     {product:'Pictcher' ,price: 26 ,available: false },
//     {product:'Flowerpot' ,price: 15 ,available: true },
//     {product:'Book' ,price: 50 ,available: true },
//     {product:'Clock' ,price:300 ,available: false },
//     {product:'T-shirt' ,price: 100 ,available: true },
// ]

// const finalPrice = orders
// .filter(({price,available})=>{
//    return available &&  price>=50
// })                                  // [{product:'Shos' ,price: 55 ,available: true },
//                                     // {product:'Computer' ,price: 1000 ,available: true },
//                                     //  {product:'Book' ,price: 50 ,available: true },
//                                     // {product:'T-shirt' ,price: 100 ,available: true }]
// .reduce((acc,{price:price2})=>{
//       return acc + price2
// },0)

// console.log(finalPrice); // 1205

// const arr = [
//   {name: "a", group: 1},
//   {name: "b", group: 2},
//   {name: "c", group: 1},
//   {name: "d", group: 2},
//   {name: "e", group: 1},
// ];

// arr.sort(({group:group1},{group:group2})=>
// group1-group2
// )
// console.log(arr);

// const arr1 = [
//   {name: "a", group: 1},
//   {name: "b", group: 2},
//   {name: "c", group: 1},
//   {name: "d", group: 2},
//   {name: "e", group: 1},
// ];

// const arrWithIndex = arr.map((item, index) => ({ ...item, originalIndex: index }));

// console.log("לפני מיון:");
// console.log(arrWithIndex.map(x => x.name + ":" + x.group));

// arrWithIndex.sort((x, y) => {
//   const groupCompare = x.group - y.group;
//   if (groupCompare !== 0) return groupCompare;
//   return x.originalIndex - y.originalIndex;
// });

// console.log("אחרי מיון:");
// console.log(arrWithIndex.map(x => x.name + ":" + x.group));

// const sArr1 = [1,2,3,4,5]
// const sArr2 = [1,2,3,4,5]
// const sArr3 = [1,2,3,4,5]
// const sArr4 = [1,2,3,4,5]
// const sArr5 = [1,2,3,4,5]
// const sArr6 = [1,2,3,4,5]
// const sArr7 = [1,2,3,4,5]
// const sArr8 = [1,2,3,4,5]
// const sArr9 = [1,2,3,4,5]
// const sArr10 = [1,2,3,4,5]

// const sArr = [
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
//   [1, 2, 3, 4, 5],
// ];
// let bArr = new Array(50);
// let i = 0;

// for (const innerArr of sArr) {
//     for(const num of innerArr){
//         bArr[i] = num
//         i++
//     }
// }

// console.log(bArr);

// const users = [
//   { name: "Israel", addresses: [ "Tel Aviv" ,"hyfa" ]},
//   { name: "Avraham", addresses: [] },
//   { name: "Nati" },
//   { name: "Israel", addresses: [ "hyfa" ] },
//   { name: "Avraham", addresses: [ "j-m" ] },
//   { name: "Nati" },
//   { name: "Israel", addresses: [ "Netivot","hyfa" ] },
//   { name: "Avraham", addresses: [] },
//   { name: "Nati"  ,addresses: [ "Netivot" ]},
// ];


// const numAddressses= users.flatMap(({addresses})=>{
//    return addresses?  addresses : []
  
// }).length


// console.log(numAddressses);













