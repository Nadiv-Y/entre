import React ,{useMemo}from 'react'

const Child = () => {
    const countPrimes=useMemo(()=> (limit)=> {
  let count = 0;
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) count++;
  }
  return count;
})
const items = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape",
  "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange",
  "papaya", "peach", "pear", "pineapple", "plum", "raspberry",
  "strawberry", "tangerine", "watermelon"
];
const filtered = useMemo(()=>items.filter(item => item.startsWith("p")), [items])

  return (
    <div>
      {console.log(countPrimes(100000))}
      <h1>{countPrimes(100000)}</h1>
      <h2>{console.log(filtered)}</h2>

    </div>
  )
}

export default Child
