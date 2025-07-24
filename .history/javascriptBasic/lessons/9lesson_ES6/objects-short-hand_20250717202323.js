// declaretion function 
function f(){
    console.log('hello decleretion');
}
f()
//expresion function
const f1 = function f(){
    console.log('hello expresion');
}

f1()
//expresion function with arrow
const f2 = () => {
    console.log('hello expresion with arrow');
}

f2()

const Nadiv = Number => console.log(Number + 600);

console.log(Nadiv(31));


setTimeout(function(){
console.log('avi is shoked');
},1000)

const person = {
    tired: 'yanir',
    smoked: 'maoz', 
    print(){
        setTimeout(function(){
console.log(`who is tired ${this.tired} 
    who is smoked ${this.smoked}`);

        },1000)
    }
}