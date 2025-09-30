import React, { useState } from "react";

const A1CounterUseState = () => {
  const [count, setcount] = useState(0);
  return (
    <div>
      <button onClickCapture={() => setcount(count + 1)}>counter</button>
      {count}
    </div>
  );
};

export default A1CounterUseState;
