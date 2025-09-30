import React, { useCallback, useState } from "react";
import Child from "./Child";

const A19UseCallback = () => {
  // const [count, setcount] = useState(0);

  const callback = useCallback(() => console.log("I dont render"),[]);
  return (
    <div>
      <Child callback={callback} />
      {/* <button onClickCapture={() => setcount(count + 1)}>counter</button> */}
      {/* {count} */}
    </div>
  );
};

export default A19UseCallback;
