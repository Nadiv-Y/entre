import React, { useReducer, useState } from "react";
//16 & 17 & 18
const A16ListReduser = () => {
    const [valInput , setvalInput] = useState('')
  const reducer = (state, action) => {
    switch (action.type) {
      case "Add":
        return [...state, action.value];
      case "Remove":
        return state.filter((str) => str !== action.value);
      case "Reset":
        return [];
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);
  return (
    <div>
      <input type="text" onChange={(e)=> setvalInput(e.target.value)}/>
      <button type="button" onClick={()=> dispatch({type: 'Add' , value:valInput })}>add task</button>
      <button type="button" onClick={()=> dispatch({type: 'Remove' , value:valInput })}>remove task</button>
      <button type="button" onClick={()=> dispatch({type: 'Reset' })}>reset state</button>
      <ul>
      {state.map((task)=>{
         return <li key={task}>{task}</li>
      })}
      </ul>
    </div>
  );
};

export default A16ListReduser;
