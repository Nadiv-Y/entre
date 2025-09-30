import React, { useEffect, useState } from "react";

const A10WindowResizing = () => {
  const [windowX, setwWndowX] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setwWndowX(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <h1>{windowX}</h1>
    </div>
  );
};

export default A10WindowResizing;
