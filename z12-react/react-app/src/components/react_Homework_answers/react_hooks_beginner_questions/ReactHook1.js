import React, { useReducer } from "react";

const ReactHook1 = () => {


  const reducer = (state, action) => {
    switch (action) {
      case "PLUS":
        return state + 1;

      case "MINUS":
        return state - 1;
      default:
        return state;
    }
  };

  const [state , dispatch] = useReducer(reducer, 5)

  return <div>
    <button onClick={()=> dispatch('PLUS')}>PLUS</button>
    {state}
  </div>;
};

export default ReactHook1;
