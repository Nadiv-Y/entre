import React, { useState } from "react";

const A5List = () => {
  const [listTask, setListTask] = useState([]);
  const [textInInput, setTextInInput] = useState("");
  return (
    <div>
      <input
        type="text"
        onChange={(event) => setTextInInput(event.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setListTask([...listTask,textInInput ]);
        }}
      >
        Add a task
      </button>
      <ul>
      
        {listTask.map((task,index) => 
          <li key={index}>{task}</li>
        )}
      </ul>
    </div>
  );
};

export default A5List;
