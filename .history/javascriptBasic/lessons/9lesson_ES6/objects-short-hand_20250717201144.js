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
const f2 =  f() => {
    console.log('hello expresion');
}

f2()