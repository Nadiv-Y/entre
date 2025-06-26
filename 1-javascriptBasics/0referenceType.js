const person = {
    name : 'Tal',
    age : 34
}

const a = 1
b = a
// a 001 -> 1
// b 002 -> 1
console.log(a, b)

b = 7
// b 002 -> 7

console.log(a, b)


console.log(person);

person.id = '30857697677'


const person1 = person
// person 0034 -> {name, age, id}
// person1 0034 -> {name, age, id}


person1.address = 'Tel Aviv'
// person1 0034 -> {name, age, id, address}
//person1: {name: 'Tal', age: 34, id: '30857697677', address: 'tel Aviv'}

//person {name: 'Tal', age: 34, id: '30857697677'}



console.log(person);
// {name, age, id, address}

let g = 'gender'

console.log('ldgh', g);


person.g = 'something'//{... 'g': 'value'}
// {name, age, id, address, g}

person[b] = 'male'
person[person.g] = 'male'

console.log('person', person);
// {name, age, id, address, g, gender}

console.log();

console.log("============");



const student = 'Yaer'

const year = 1998

const obj = {

}


obj[student] = 'Male'//{Yaer: 'Male'}

obj.temperature = 34//{Yaer: 'Male'; temperature: 34;}

obj[year]  = 'Bad year'//{Yaer: 'Male'; temperature: 34; 1998: 'Bad year'}

obj.year = year//{Yaer: 'Male'; temperature: 34; 1998: 'Bad year'; year: 1998}

// person[b] = 'male'

// console.log(b)

obj[person['7']] = 'Less attractive'//{Yaer: 'Male'; temperature: 34; 1998: 'Bad year'; year: 1998; male: 'Less attractive'}
// console.log(obj)


obj[3 + undefined] = 'Its typeof is a famous bug'//{aer: 'Male'; temperature: 34; 1998: 'Bad year'; year: 1998; male: 'Less attractive'; NaN: 'Its typeof is a famous bug'}


const strange = '3 + undefined'

obj[strange] = 'llllllll'



let harel;

obj[harel] = 'dhafkkkkkkkkkrjgbjh '


console.log(obj)







const variable = 'I know JS'


const obj1 = {

}

obj1.variable = 'var'
obj1[variable] = 'Is it true?'

//obj1

