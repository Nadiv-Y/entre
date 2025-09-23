import React from "react";
import add, { mult } from "./Math";

const ES6 = () => {
  function test() {
    if (true) {
      var a = 10;
      let b = 20;
    }

    console.log(a);
    //   console.log(b);
  }
  test();

  const sum = (...nums) => {
    return nums.reduce((acc, num) => acc + num, 0);
  };

  const set = [1, 2, 3];
  const newSet = [...set, 4];

  //old way
  const x = 1,
    y = 2;
  const key = "sum";
  const obj1 = {
    x: x,
    y: y,
    sum: function () {
      return x + y;
    },
  };

  //ES6 way

  const obj2 = {
    x,
    y,
    [key]: function () {
      return x + y;
    },
  };

  let c = 10,
    d = 20;
  [c, d] = [d, c];
  const arr = [1, 2, 3, 4];
  // first = ?, rest = ?
  const [first, ...rest] = arr;

  //question 11
  const user = { id: 7, name: "Avi", address: { city: "TLV", zip: 12345 } };
  const { id, name: fullName, address: { city = "N/A" } = {} } = user;

  //backtick
  const profassional = "Fullstack devaloper";
  const backTick = `My name is Nadiv, im a ${profassional}, and it's amazing: \``;

  //contructor

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    say() {
      return `Hello ${this.name} and my age is ${this.age}`;
    }

    get initial() {
      return this.name[0];
    }
  }
  const p = new Person("Nadiv", 26);

  //extend supr admin

  class Person1 {
    constructor(name) {
      this.name = name;
    }

    say() {
      return `hello ${this.name}`;
    }
  }

  class Admin extends Person1 {
    constructor(name) {
      super(name);
    }

    say() {
      return super.say() + ` using Admin contructor`;
    }
  }

  const u = new Admin("Nadiv");

  //static
  class Id {
    static counter = 0;

    static next() {
      this.counter += 1;
      return this.counter;
    }
  }

  class Person3 {
    constructor(name, age, profassional, study) {
      this.name = name;
      this.age = age;
      this.profassional = profassional;
      this.study = study;
    }

    present() {
      return `Hey, my name is ${this.name} and i'm ${this.age}. I'm working as ${this.profassional} and study ${this.study}`;
    }
  }

  const nadiv = new Person3("Nadiv", 26, "Oparation manager", "fullstack");

  //for in vs for of

  const user4 = {name: 'Nadiv',age: 26 }

  for(const key in user4){
    console.log(key,user4[key]);
  }

  const arr4 =[10,20,30]

  for(const item of arr4){
    console.log(item);
  }

  //question 21
  function* powers(base, limit) {
  for (let i = 0; i <= limit; i++) {
    yield base ** i; 
  }
}

for (const val of powers(2, 5)) {
  console.log(val);
}

console.log([...powers(3, 4)]); 

const user5 = {name: 'nadiv', age: 26}
const clone = Object.assign({},user5)
const key1 = Object.keys(user5)
const value = Object.values(user5)
const entries = Object.entries(user5)


  return (
    <div>
      <h1>Home work</h1>
      <p>
        answer 1: <br />
        use const as defulet for values that should not change <br />
        use let only when you need reassignment <br />
        avoid var - use only in legacy code
      </p>
      <br />
      <p>
        answer 2: <br />
        console.log a - cannot acceses to a value befor decler and the same is
        for b
      </p>
      <br />
      <p>
        answer 3: <br />
        let = x works only inside the block in var tou dont have a limit - the
        example is above in function test
      </p>
      <br />
      <p>
        answer 4: <br />
        this print 42 becuase the arrow finction inherit from m fuction
      </p>
      <br />
      <p>
        answer 5: <br />
        cannot be used with new - in constructor <br />
        cannot be used as an object method that uses dynamic `this` unless we
        use .bind but its more complex
      </p>
      <br />
      <p>
        answer 6: <br />
        in the first log - Guest ! in the second log - Ana. in the third log -
        Dima .
      </p>
      <br />
      <p>
        answer 7: <br />
        <p>{sum(1, 2, 3)}</p> <br />
        <p>
          using arguments it less flexiable becuase we cant use arrow functions
          with it
        </p>
      </p>
      <br />
      <p>
        answer 8: <br />
        <p>the array with sprad operator: {newSet}</p>
        <br />
        <p>the array without sprad operator:{set}</p>
      </p>
      <br />
      <p>
        answer 9: <br />
        <p>the x: {obj2.x}</p>
        <br />
        <p>the y : {obj2.y}</p>
        <br />
        <p>the function : {obj2.sum()}</p>
      </p>
      <br />
      <p>
        answer 10:
        <p>the c : {c}</p>
        <br />
        <p>the d : {d}</p>
        <br />
        <p>the first : {first}</p>
        <br />
        <p>the rest : {rest}</p>
        <br />
      </p>
      <br />
      <p>
        answer 11:
        <br />
        <p>The id is : {id}</p>
        <p>The full name is: {fullName}</p>
        <p>The address: {}</p>
      </p>
      <br />
      <p>
        answer 12: <br />
        <p>backtick text : {backTick}</p>
      </p>
      <br />
      <p>
        answer 14:
        <br />
        <p>{p.say()}</p>
        <p>{p.initial}</p>
      </p>
      <br />
      <p>
        answer 15: <br />
        <p>{u.say()}</p>
      </p>
      <br />
      <p>
        answer 16: <br />
        <p>{Id.next()}</p>
        <p>{Id.next()}</p>
        <p>{Id.next()}</p>
      </p>{" "}
      <br />
      <p>prectice : </p>
      <p>{nadiv.present()}</p>
      <br />
      <p>
        answer 17: <br />
        <p>this is default : {add(5, 5)}</p>
        <p>this is named : {mult(5, 5)}</p>
      </p>
      <br />
      <p>
        answer 18: <br />
        <p>The main diferent between for of to for in is that for of uses is in array when we want to get value from the array. and for in we will use in objects</p>
      </p><br/>
      <p>
        asnwer 24: <br/>
        <p>example for object.assign {JSON.stringify(clone)}</p>
        <p>example for object.keys {key1}</p>
        <p>example for object.values {value}</p>
        <p>example for object.entries {entries}</p>
      </p>
    </div>
  );
};

export default ES6;
