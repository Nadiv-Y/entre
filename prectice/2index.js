const person = {
    name : 'nadiv',
    age : 26,
    height : 1.71,
    eyesColor : 'blue'
};

person.lastName = 'Yosef'
person.merrid = 'no'
person[person.merrid] = true
person[person.age] = 27

let person1 = person

person1.motherAge = 43

person1[person1.motherAge] = 343

console.log(person);




