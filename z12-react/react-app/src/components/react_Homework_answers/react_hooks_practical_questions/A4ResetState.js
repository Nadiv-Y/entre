import React, { useState } from "react";

const A4ResetState = () => {
    const numFirst = 18
  const [count, setcount] = useState(numFirst);

  return (
    <div>
      <button onClickCapture={() => setcount(count + 1)}>counter</button>
      <button onClickCapture={() => setcount(numFirst)}>reset</button>
      {count}
    </div>
  );
};

export default A4ResetState;