import React from "react";

const A29UseInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  // פונקציה שמעדכנת את ה-value
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // מחזיר את ה-value ואת הפונקציה onChange
  return { value, onChange };
};

export default A29UseInput;
