import React, { useMemo, useState } from "react";

const BigList = () => {
  const [filterLetter, setFilterLetter] = useState("p");

  const items = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape",
    "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange",
    "papaya", "peach", "pear", "pineapple", "plum", "raspberry",
    "strawberry", "tangerine", "watermelon"
  ];

  // כאן useMemo מונע חישוב מחדש אם filterLetter לא השתנה
  const filteredItems = useMemo(() => {
    console.log("Computing filter...");
    return items.filter(item => item.startsWith(filterLetter));
  }, [filterLetter]);

  return (
    <div>
      <input 
        value={filterLetter} 
        onChange={(e) => setFilterLetter(e.target.value)} 
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li> 
        ))}
      </ul>
    </div>
  );
};

export default BigList;
