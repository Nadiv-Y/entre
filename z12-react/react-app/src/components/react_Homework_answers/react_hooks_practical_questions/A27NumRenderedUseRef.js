import React, { useEffect, useState, useRef } from "react";

const A27NumRenderedUseRef = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  useEffect(() => {
    if (renderCount.current > 0) {
      renderCount.current += 1;
    } else {
      // הרינדור הראשון - רק נאתחל בלי לספור
      renderCount.current = 1;
    }
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount(count + 5)}>counter</button>
      <div>count: {count}</div>
      <div>prev count: {renderCount.current}</div>
    </div>
  );
};

export default A27NumRenderedUseRef;
