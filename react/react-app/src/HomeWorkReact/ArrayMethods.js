import React from "react";

const ArrayMethods = () => {
  const arr = [1, 2, 3];
  const dobled = arr.map((n) => n * 2);
  const forEach = arr.forEach((n) => n * 2);

  const arr2 = [1, 2, 3, 4, 5];
  const filtered = arr2.filter((n) => n % 2 === 0);
  const reduced = arr2.reduce((acc, n) => {
    if (n % 2 === 0) acc.push(n);
    return acc;
  }, []);

  const arr3 = [1, 2, -3, 4, 5];
  const some = arr3.some((n) => n < 0);
  const every = arr3.every((n) => n < 0);

  const xs = [1, NaN, 3];
  const includes = xs.includes(NaN);
  const indexOf = xs.indexOf(NaN);

  const arr4 = [1, 2, 3, 4];
  const slice = [...arr4.slice(0, 2), ...arr4.slice(3)];
  const splice = [arr4.splice(2, 1)];

  const arr5 = ["1", "10", "2"];
  const sort = arr5.sort();

  const arr6 = ["é", "e", "ê"];

  const sortedFrAsc = arr6.sort((a, b) => a.localeCompare(b, "fr"));
  const sortedFrDesc = arr6.sort((a, b) => b.localeCompare(a, "fr"));

  const items = [
   { price: 30, inStock: true },
  { price: 60, inStock: true },
  { price: 80, inStock: false },
  { price: 100, inStock: true },
  ];

  const total = items.filter(item => item.price > 50 && item.inStock).map(item => item.price).reduce((acc,price) => acc + price , 0)
  

  return (
    <div>
      <p>
        answer 1: <br />
        map example:{[dobled]} <br />
        forEach example:{console.log(forEach)} <br />
        for each return us undefind, map creating new array.
      </p>
      <br />
      <p>
        answer 2: <br />
        filter example : {filtered}
        <br />
        reduce example : {reduced}
        <br />
        filter is clearer becuase it keep elements based on the condition
      </p>
      <br />
      <p>
        answer 3: <br />
        short circuits: find stop searching when it find the first value that
        matrches to the condition. fliter wont stop in the first value
        <br />
        use cases: find - if i want to find the first matching item only. filter
        - if i want to get all matching items
      </p>
      <br />
      <p>
        answer 4: <br />
        some Check if at least one element in the array passes the test. for
        example: check in log{console.log(some)} <br />
        every Check if all elements in the array pass the test. for example :
        check in log{console.log(every)} <br />
      </p>
      <br />
      <p>
        answer 5: <br />
        includes: {console.log("includes:" + includes)} return us true, so its
        mean that includes know how to handle with NaN <br />
        indexOf: {console.log("indexOf:" + indexOf)} return us -1
      </p>
      <br />
      <p>
        answer 6: <br />
        the slice way gives us new array and dont change the original array:{" "}
        {slice} <br />
        the splice way - gives us changes the original way - it remove the 3rd
        number from the original :{arr4}
      </p>
      <br />
      <p>
        answer 7: <br />
        sort method takes all the values that inside the array and convert them
        to strings so the order become 1, 10, 2 - for example : {sort} <br />
        but if we change the condition to a-b we will get the right sorted
        numbers for example : {arr5.sort((a, b) => a - b)}
      </p>
      <br />
      <p>
        answer 8: <br />
        Ascending French sort : {sortedFrAsc} <br />
        Descending French sort : {sortedFrDesc}
      </p>
      <br />
      <p>
        answer 9: <br />
        push - push item to the end <br />
        pop - remove item from the end <br />
        unshift - add item to start <br />
        shift - remove item from start
      </p>
      <br />
      <p>
        answer 10: <br />
        {total}
      </p><br/>
      <p>
        answer 11:
      </p><br/>
      <p>
        answer 12:
      </p><br/>
      <p>
        answer 13:
      </p>
    </div>
  );
};

export default ArrayMethods;
