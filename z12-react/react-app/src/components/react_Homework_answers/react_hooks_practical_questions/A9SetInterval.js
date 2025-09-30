import React, { useEffect, useState } from "react";

const A9SetInterval = () => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    let inter = setInterval(() => {
       setNumber((prev) => prev + 1);
       console.log('inter');
       
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, []);


  return (
    <div>
      <div>{number}</div>
    </div>
  );
};

export default A9SetInterval;
