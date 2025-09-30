import React, { useEffect, useRef, useState } from "react";

const A26PrevState = () => {
  const [count, setCount] = useState(0);
  const prevstate = useRef(0);
  useEffect(() => {
    prevstate.current = count;
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>counter</button>
      <div>count: {count}</div>
      <div>prev count: {prevstate.current}</div>
    </div>
  );
};

export default A26PrevState;
