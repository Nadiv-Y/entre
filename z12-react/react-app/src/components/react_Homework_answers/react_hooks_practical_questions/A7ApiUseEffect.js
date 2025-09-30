import React, { useEffect, useState } from "react";
import axios from "axios";
const A7ApiUseEffect = () => {
  const [respons, setrespons] = useState([]);

  useEffect(() => {
    const prom = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        setrespons(res.data.slice(0, 20));
      } catch (error) {
        console.log("error", error);
      }
    };
    prom();
  }, []);

  return (
    <div>
      <ul>
        {Array.isArray(respons) &&
          respons.map((obj) => <li key={obj.id}>{obj.title}</li>)}
      </ul>
    </div>
  );
};

export default A7ApiUseEffect;
