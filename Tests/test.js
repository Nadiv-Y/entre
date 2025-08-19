const obj = {
  name: "Carol",
  greet() {
    console.log(this.name)
  },
}
const a = obj.greet
a()