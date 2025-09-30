import React, { useState } from "react";

const A2UseStateDarkLight = () => {
  const [theme, setTheme] = useState("LIGHT");

  const changeBackground = () => {
    theme === "LIGHT" ? setTheme("DARK") : setTheme("LIGHT");
    theme === "LIGHT"
      ? (document.body.style.backgroundColor = "#000")
      : (document.body.style.backgroundColor = "#fff");
  };

  return (
    <div>
      <button onClick={() => changeBackground()}>
        {theme === "LIGHT" ? "DARK" : "LIGHT"}
      </button>
    </div>
  );
};

export default A2UseStateDarkLight;
