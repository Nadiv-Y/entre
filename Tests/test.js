let orders = [
  { price: 20, inStock: true },
  { price: 75, inStock: false },
  { price: 120, inStock: true },
  { price: 40, inStock: true },
  { price: 60, inStock: true },
]

orders = orders.filter((order) => order.inStock === true).map((order) => order.price).reduce((prev, curr) => {if (curr > 50) {prev += curr}return prev}, 0)
console.log(orders)
