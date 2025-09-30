import  { createContext, useState } from "react";
import Child1 from "./Child1.js";
import Child2 from "./Child2.js";
 export const CounterContext = createContext();

const A14DisplayUseContext = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>כפולות 5</h1>
      <button onClick={()=> setCounter(counter+5)}>plus 5</button>
      <CounterContext.Provider value={counter}>
        <Child1 />
        <Child2 />
      </CounterContext.Provider>
    
    </div>
  );
};

export default A14DisplayUseContext;
