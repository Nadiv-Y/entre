import React, { useEffect, useState } from "react";

const A8TitlePage = () => {
  const [title, setTitle] = useState(0);
  useEffect(()=>{
   document.title =`counter: ${title}`
  },[title])
  return (
    <div>
      <h1>{title}</h1>
      <button type="button" onClick={()=>{setTitle(title+1)}}>counter</button>
    </div>
  );
};

export default A8TitlePage;
