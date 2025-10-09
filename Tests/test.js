//  Implement `bindAll(obj, ...methodNames)`
// that binds the listed methods to `obj`
// (handy before passing callbacks).

function bindAll(obj, ...methodNames) {
  methodNames.forEach((m) => obj = obj[m].bind(obj));
}
let obj1 = {
  a(){

  }
}
console.log(bindAll(obj1, 'a'));
