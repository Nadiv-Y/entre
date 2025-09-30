// // 'use strict'
// function func(name){
//     this.name = name
//     return this.name
// }

// const arrow1 = (name) => this.name

// console.log(arrow1('dvir'));
// console.log(func('dvir'));

// 'use strict'

// const arrow = (name) => {
//     console.log('this is:', this);
//     return this.name;
// };

// console.log(arrow('dvir'));

// const errow = (name)=> {
//     this.name = name
//     console.log(this.name)

// }

// const name1 = new errow('ayala')

// name1()

// class func {
//   constructor(name) {
//     this.name = name;
//   }
//   get() {
//     console.log(this);
//   }
//   get2 = () => {
//     console.log(this);
//   };
// }

// const newfunc = new func('aaaaa')
// newfunc.get() //func {name: 'aaaaa', get2: ƒ}
// newfunc.get2()//func {name: 'aaaaa', get2: ƒ}

// const obj = {
// x: 42,
// getX() { return this.x }
// };
// const g = obj.getX;
// console.log(g());

// const obj = {
// x: 42,
// getX() { return this.x; }
// };
// const g = obj.getX.bind(obj);
// console.log(g());
// const obj = {
// x: 1,
// inc: () => {
// this.x++;
// }
// };
// obj.inc();
// console.log(obj.x);

// const obj = {
//   x: 1,
//   inc() {
//     setTimeout(function () {
//       this.x++;
//       console.log("זמן קצוב", this.x);
//     }, 0);
//   },
// };
// obj.inc();

// const obj = {
//   val: 10,
//   m: function () {
//     return this.val;
//   },
// };
// const h = obj.m.bind({ val: 99 });
// console.log(h.call({ val: 7 }));

// const obj = {
//   x: 1,
//   inc() {
//     setTimeout(() => {
//       this.x++;
//       console.log("זמן קצוב של חץ", this.x);
//     }, 0);
//   },
// };
// obj.inc();

// const obj = {
// n: 5,
// m: () => this.n
// };
// console.log(obj.m());

// const button = document.createElement('button');
// button.textContent = 'Click';
// button.addEventListener('click', function() {
// console.log(this.tagName);
// });
// button.click();

// const button = document.createElement('button');
// button.addEventListener('click', function() {
// console.log(this === button);
// });
// button.click();
//... תקן / שפר את הקוד (הסבר את הבעיה וכתוב תיקון)

// class Counter {
// constructor() {this.c = 0; }
// inc =()=>{console.log( this.c++);
//  }
// }
// const counter = new Counter();
// setInterval(counter.inc, 100);

// // console.log( counter.inc());
// const button = document.createElement('button')
// button.addEventListener("click", function(){
//   this.disabled = true;

// });

// const cart = {
//   items: [1, 2, 3],
//   sum() {
//     let total = 0;
//     this.items.forEach(
//       function (n) {
//         total += n * this.multiplier;
//       }.bind(cart)
//     );
//     return total;
//   },
//   multiplier: 2,
// };

// console.log(cart.sum()); //12
// const obj = { x: 3 };
// const fn = function () { return this.x};

// const bound = fn.bind(obj);
// console.log(bound());

// React/TS (קונספטואלי): מדוע אנו מעדיפים לעתים קרובות arrow של שדה מחלקה (`handleClick = () => {}`) על פני מתודה רגילה + `this.handleClick = this.handleClick.bind(this)` בבנאי? ספק דוגמה קצרה לקוד.

// מימוש `once(fn, ctx?)` אשר מחזיר גרסה שיכולה לפעול פעם אחת בלבד וקורא ל-`fn` עם `this = ctx` אם סופק, אחרת שומר על `this` של הקורא:
// 'use strict'

// const once = function (func, obj) {
//   let called = true;
//   return (funm = (a, b) => {
//     if (called) {
//       called = false;
//       return func.call(obj, a, b);
//     }
//   });
// };

// const log = function (a, b) {
//   console.log(this.prefix, a + b);
// };

// const onceLog = once(log, { prefix: "[sum]" });
// onceLog(1, 2); //[sum] מדפיס פעם אחת //3
// onceLog(3, 4); // לא מדפיס
//שאלה 27
// function mapWith(arr, methodName) {
//   return arr.map((x) => {
//     return x[methodName]();
//   });
// }

// const arr = ["a", "bb", "ccc"];
// console.log(mapWith(arr, "toUpperCase"));
// ['A','BB','CCC']

// שאלה 28

const obj = {
  name: "Yoel",
  age: 15,
  hobby: "learn",
  printObj() {
    console.log(this);
  },
  printAge() {
    console.log(`Your age in 20 years:${this.age + 20} `);
  },
  printAll() {
    console.log(
      `your name:${this.name}, your age: ${this.age} , your hobby: ${this.hobby}`
    );
  },
};

function bindAll(obj, ...methodName) {
  for (const name of methodName) {
    obj[name] = obj[name].bind(obj);
  }
  return obj;
}
bindAll(obj, "printObj", "printAge", "printAll");

const jjj = obj.printAll;
jjj(); // your name:Yoel, your age: 15 , your hobby: learn


