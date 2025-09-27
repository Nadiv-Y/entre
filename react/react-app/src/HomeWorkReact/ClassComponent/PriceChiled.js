import React, { useState } from "react";

const PriceChiled = ({ price }) => {

    
    const showPrice = (price) => {
    const wow = price
    console.log(wow);
    return wow
    };
  return (
    <div>
      <button onClick={() => showPrice(price)}>Show price</button>
    </div>
  );
};

export default PriceChiled;
