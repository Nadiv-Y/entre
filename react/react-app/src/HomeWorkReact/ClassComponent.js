import React, { Component, useState } from "react";
import ParentComponent from "./ParentComponent";
import listItem from "./ClassComponent/ParentList";
import ChiledComponent from "./DefaultVSTypes";

const ClassComponent = () => {
  //answer 4
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((prev) => prev + 1);
  };
  const decrease = () => {
    setCount((prev) => prev - 1);
  };

  //answer 8

  const todos = [
    { id: 1, task: "clean the room" },
    { id: 2, task: "throw the trash" },
  ];

  //answer 9
  const [users, setUsers] = useState([
    { id: 1, name: "nadiv" },
    { id: 2, name: "amit" },
    { id: 3, name: "hadar" },
    { id: 4, name: "oliver" },
    { id: 5, name: "nachom" },
  ]);

  const changTheFifth = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === 5 ? { ...user, name: "haa ahhhi" } : user
      )
    );
  };

  return (
    <div>
      <h1>Home work</h1>
      <p>
        answer 1 : <br />
        <p>
          props its data that the component inhearts from the parents, state its
          data that the component control by her self
        </p>
      </p>
      <br />
      <p>
        answer 2: <br />
        <p>I dont get the question</p>
      </p>
      <br />
      <p>
        answer 3: <br />
        <p>
          setState - render the react app, if we will change the state directly
          the react app wont render{" "}
        </p>
      </p>
      <br />
      <p>
        answer 4: <br />
        <p>
          we should use prevState when we want that the react remember the
          previos state
        </p>
        <button onClick={increase}>+</button>
        <span>{count}</span>
        <button onClick={decrease}>-</button>
      </p>
      <br />
      <p>
        answer 5: <br />
        <p>
          the problem is that the value of n will stay = 1 becuase the code
          doesnt includes prevState
        </p>
        <p>
          i would fix it by changing this row "this.setState n: this.state.n +
          1" ; to this : "this.setState n: (prev =arrow prev + 1)"{" "}
        </p>
      </p>
      <br />
      <p>
        answer 6: <br />
        <p>bind in constructor go to file optionA.js</p>
        <p>public class field arrow go to file optionB.js</p>
        <p>render inline arrow go to file optionC.js</p>
      </p>
      <br />
      <p>
        answer 7: <br />
        <p>check on file - ParentList & PriceChiled</p>
      </p>
      <br />
      <p>
        answer 8: <br />
        <p>
          the wrong way is to use index because we have to give stable key to
          react, not index espessially if the list is permenenet{" "}
        </p>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.task}</li>
          ))}
        </ul>
        <br />
        <p>
          answer 9 : <br />
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
          <button onClick={changTheFifth}>change the fifth Name</button>
        </p>
        <br />
        <p>
          answer 10 : <br />
          <p>
            default props created for cases that the user dont send value so we will hace a default value.
          </p>
          <p>type props for testing, we can role that only string / number can pass as a props but if the use or us will use it not currectly the app will worn us in the terminal but wont collapse.</p>
          <p>foe the example please turn on the "ChiledComponent" inside app.js</p>
        </p><br/>
        <p>
          answer 11: <br/>
          <p></p>
        </p>
      </p>
    </div>
  );
};

export default ClassComponent;
