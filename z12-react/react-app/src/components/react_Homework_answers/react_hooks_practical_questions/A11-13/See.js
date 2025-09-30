import React, { useState } from "react";
import Mainnnn from "./Mainnnn.js";

export const ThemeContext = React.createContext();
const See = () => {
  const [theme, setTheme] = useState(false);

  return (
    <header style={{ backgroundColor: theme === false ? " #fff" : " #000" }}>
      <h1 style={{ color: theme === false ? " #000" : " #fff" }}>Hello Hook</h1>
      <button type="button" onClick={() => setTheme(!theme)}>
        Change to {theme === false ? "dark" : "light"}
      </button>
      <ThemeContext.Provider value={theme}>{/*תשובה 12: כך => אנחנו מייצאים את הערך שאנחנו רוצים לשתף */}
        <Mainnnn />
      </ThemeContext.Provider>
    </header>
  );
};

export default See;
