//  Implement `once(fn, ctx?)` which returns a version that can run
// only once and invokes `fn` with `this = ctx` if provided,
// otherwise preserves the caller’s `this`:

const log = function (a, b) {
  console.log(this.prefix, a + b)
}

const once = function (fn, ctx = this) {
  let a = true
  
  fn = fn.bind(ctx)
  if (a) {
    return fn
    a = false
  }
}

const onceLog = once(log, { prefix: "[sum]" })

console.log(onceLog)

onceLog(1, 2) // prints once

onceLog(3, 4) // does not print
