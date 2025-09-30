import React, { useRef } from "react";

const A25focusUseRef = () => {

    const inputRef = useRef()
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <button type="button" onClick={()=>inputRef.current.focus()}>Focus!</button>
    </div>
  );
};

export default A25focusUseRef;
