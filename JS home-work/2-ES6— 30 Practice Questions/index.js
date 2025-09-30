// a = 3
// console.log(a);// 3
// var a = 5
// console.log(a);// 5

// console.log(a); // error
// let a = 10;

// function f() {
// console.log(b); //error
// const b = 5;
// }
// f();

// { let x = 1 }
//  console.log(x) // error

// {var y = 2 }
// console.log(y)// 2

// const obj = {
// x: 42,
// m() {
// const inner = () => this.x;
// return inner();
// }
// };
// console.log(obj.m());// 42

// class person {
//   constructor(name, aga, numChild) {
//     this.name = name;
//     this.aga =  aga ;
//   }

//    get= () => {
//    console.log( this.aga+3);

//   }
// }

// const israel = new person("israel", 30, 5);

// israel.get();

// const  get= (aga) => {
//    console.log( this.aga+3);

//   }
// get(45)

// function greet(name = 'Guest', exclaim = name.length > 3) {
// return `Hello, ${name}${exclaim ? '!' : '.'}`;
// }
// console.log(greet());// Hello, Guest!
// console.log(greet('Ana'));//Hello, Ana.
// console.log(greet('Dima', false));//Hello, Dima.

// const nums = [1,2,3,4,5,6,78,9,52,15]

// function sum(...nums){
//   return nums.reduce((a,c)=> a+c ,0)
// };
// console.log(sum(12,2,25,8,55,2,6,3,5,4,8,7,5,4));//146

// function sum1(a,b,c,d){
//     return arguments
//     // Arguments(4) [1, 2, 2, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// }
// console.log( sum1(1,2,2,4));

// const set = new Set([1,2,3]) //[1,2,3]
// const spred = [...set , 4]
// console.log(spred);//[1, 2, 3, 4]

// const x = 1, y = 2;
// const key = 'sum';
// const obj = {
// x,
// y,
// [key](){x + y}
// };
// console.log(obj);//{x: 1, y: 2, sum: ƒ}

// let a = 10, b = 20;

// [a,b] = [b,a]
// console.log(a,b); // a = 20 , b = 10

// const arr = [1,2,3,4];

// const rest = arr.splice(1,arr.length-1)
// const first = arr.shift()

// console.log(first);//1
// console.log(rest);//[2,3,4]
// console.log(arr);// []

// const user = { id: 7, name: 'Avi', address: { city: 'TLV', zip: 12345 } };

// function returnCity({id, name: fullName,address }){
//     const city = address? address.city : 'N/A'
//     console.log(`id: ${id}, fullName: ${fullName}, city: ${city}`);

// }
// returnCity(user)//id: 7, fullName: Avi, city: TLV
// const a = 'a'
// const str = `Extract \`id\`, rename \`name\` to \`fullName\`, and get \`city\` with safe default 'N/A'\` if \`address\` is missing.
// 12) Template literals:${a} Build a multi-line string with interpolation and a backtick character inside it. Show how to escape backticks.

// 13) Tagged templates: Write a simple tag function  that HTML-escapes interpolations to avoid XSS.
// `
//  13 שאלה
// function escapeHTML(str) {
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#39;");
// }
// function safe(str, ...values){
//     let result = str[0];
//     for (let i = 0; i < values.length; i++) {
//        result += escapeHTML(values[i])
//        result+= str[i+1]
//     }
//     return result
// }

// const name = '<img onerror=alert(1) />';
// const html = safe`Hello ${name}!`;
// console.log(html);

// function Person(name) {
// this.name = name;
// }

// Person.prototype.say = function(){ return 'Hi ' + this.name; };

// Object.defineProperty(Person.prototype, 'initial', {
// get() { return this.name[0]; }
// });

// שאלה 14
// class Person {
//     constructor(name){
//     this._name = name
//     }

//     say (){ return 'Hi ' + this._name; }
//     get name () { return this._name}
// }
// const person1 = new Person('Israel')
// console.log(person1);//Person {_name: 'Israel'}
// console.log(person1.say())//Hi Israel
// console.log(person1.name)//Israel

// שאלה 15

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   say() {
//     return "Hi " + this.name;
//   }
//   get getname() {
//     return this.name;
//   }
// }
// const person1 = new Person("Israel");
// console.log(person1); //Person {_name: 'Israel'}
// console.log(person1.say()); //Hi Israel
// console.log(person1.name); //Israel

// class Admin extends Person {
//   constructor(name, age) {
//     super(name);
//     this.age = age;
//   }
//   say() {
//     return `Good Bay ${this.name} aga: ${this.age}`;
//   }
// }
// const admin1 = new Admin("Reuvan", 15);
// console.log(admin1.say()); // Good Bay Reuvan aga: 15

//שאלה 16

// class Id {
//   constructor() {
//   this.id =0
//   }
//   get getId(){ return this.id? this.id : this.id = Id.next(this.count)}

//   static count = 0;
//   static next = () => {   this.count++
//     return  this.count
//   } ;
// }
// const w1 = new Id();
// const w2 = new Id();
// const w3 = new Id();

// console.log(w1.getId);//1
// console.log(w2.getId);//2
// console.log(w3.getId);//3

// //math.js
// export function math(){

// }
// // app.js
// import {math} from './math.js'

// //math.js
// export default function math(){

// }
// // app.js
// import math from './math.js'

// // שאלה 18
// //index.js
// export * from './utils.js'
// export {default as math} from './math.js'

// שאלה 19

// function range(start, end){
//     let arr = []
//   for(let i = start+1 ; i < end; i++){
//     arr = [...arr , i]
//   }
//   return arr
// }
// console.log([...range(1,8), 5 , ...range(1,10)]);
// //(15) [2, 3, 4, 5, 6, 7, 5, 2, 3, 4, 5, 6, 7, 8, 9]

// for(const item of range(1,5)){
//     console.log(item); // 2 // 3 // 4

// }

// function range(start, end) {
//   return {
//     [Symbol.iterator]() {
//       let current = start;
//       return {
//         next() {
//           return current <= end
//             ? { value: current++, done: false }
//             : { done: true };
//         },
//       };
//     },
//   };
// }

// for (const num of range(1, 4)) {
//   console.log(num); //1 /2  /3 /4
// }

// 20 שאלה

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const obj = {
//   name: "Israel",
//   age: 6,
//   Children: false,
// };

// for (const num of arr) {
//   console.log(num);
//   // 1 2 3 4 5 6 7 8 9 10
// }

// for (const key in obj) {
//   console.log(key, obj[key]);
//   // name Israel
//   // age 6
//   // Children false
// }

// שאלה 21

// function* powers(base,limit){
//     for(let i = 0; i <= limit; i++){
//      yield base**i

//     }

// }

// for(const value of powers(2,5)){
//     console.log(value);

// }
// // 1 2 4 8 16 32

// const powers1 = powers(2,5)
// console.log(powers1.next());

// let key = {key: 'value'}

// const map = new Map()
// map.set(key , 'value' )
// map.set('dddd',555)

// console.log(map);

// key = null
// console.log(map);
//Map(2) {{…} => 'value', 'dddd' => 555} ככה זה נראה סגור

//[[Entries]]
// 0: {Object => "value"}
// 1: {"dddd" => 555}
// size: 2
// [[Prototype]]: Map

//0: {Object => "value"}
//key:
// key: "value"

//[[Prototype]]: Object

//value: "value"
//1: {"dddd" => 555}

//שאלה 24

// const obj1={
//     name: 'Dvir',
//     age: 4,
//     hobby:"play",
// }

// const objAssign = Object.assign(obj1)
// //{name: 'Dvir', age: 4, hobby: 'play'}

// const valus = Object.values(objAssign)
// console.log(valus);
// //['Dvir', 4, 'play']

// const keys = Object.keys(objAssign)
// console.log(keys);
// //['name', 'age', 'hobby']

// const newObj = {}
// for(const index in keys){
// newObj[keys[index]] =typeof valus[index] == 'string'? valus[index].toUpperCase(): valus[index] + 10

// }
// console.log(newObj);
// //{name: 'DVIR', age: 14, hobby: 'PLAY'}

// תרגיל 25

// const arr = [101,2,35,4,56,78,95,20,8,56,15,5648]

// const findIndex = arr.findIndex((n)=> n > 101 )
// console.log(findIndex);// index = 11 (5648)
// const find = arr.find((n)=> n > 101 )
// console.log(find) // 5648

// const arr1 = Array.from("hello");
// console.log(arr1); // ["h", "e", "l", "l", "o"]

// const arr2 = Array.from(3);
// console.log(arr2); // []

// const arr3 = Array.of(3);
// console.log(arr3); // [3]

// const arr4 = Array.of(1, 2, 3);
// console.log(arr4); // [1, 2, 3]

// const _id = Symbol('id')
// function person(name, id, city) {
//   return  {
//     name,
//     [_id]: id,
//     city
//   }

// }
// const user1 = person('Israel',214814168, 'jerusalem')
// console.log(user1);//{name: 'Israel', city: 'jerusalem', Symbol(id): 214814168}

// for(const key in user1){
//     console.log(key); //name, city
// }

// console.log(Object.keys(user1));// ['name', 'city']
// console.log(Object.getOwnPropertySymbols(user1));// [Symbol(id)]

// תרגיל 27

// const obj = {
//   name: "Dvir",
//   age: 4,
//   hobby: "play",

//   [Symbol.iterator]() {
//     const arr = Object.entries(this)

//     let index = 0
//     return {

//       next() {
//        if(arr.length>index ){
//        const [key,value]= arr[index++]
//        return{value: {key, value} , done: false}}
//       else{
//      return  {done: true}
//       }
//       },
//     };
//   },
// };

// for(let {key, value} of obj){
//     console.log(key);
//     console.log(value);
// }
//name / Dvir / age/ 4/ hobby/ play

// const obj = {
//     [Symbol.toStringTag]: "mjkood"
// }
// console.log(Object.prototype.toString.call(obj)); //[object mjkood]

// function setTimeout1(callback, num1, num2) {
//   setTimeout(() => {
//     callback(num1, num2);
//   }, 5000);
// }

// setTimeout1((x, z) => console.log(x + z), 12, 56);

// function setTimeout1(num1, num2) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num1 + num2);
//       reject("Error");
//     }, 10000);
//   });
// }

// setTimeout1(12, 56).then((result) => console.log(result));
// שאלה 29
console.log('A');
Promise.resolve().then(() => console.log('B'));
console.log('C');
queueMicrotask(() => console.log('D'));

// A/C/B/D

Promise.resolve(42).then(val => console.log(val)); // 42

Promise.reject("error").catch(err => console.log(err)); // error

Promise.all([Promise.resolve(1), Promise.resolve(2)])
  .then(vals => console.log(vals)); // [1, 2]

Promise.allSettled([Promise.resolve(1), Promise.reject("X")])
  .then(results => console.log(results));
/* [
  { status: "fulfilled", value: 1 },
  { status: "rejected", reason: "X" }
] */

  