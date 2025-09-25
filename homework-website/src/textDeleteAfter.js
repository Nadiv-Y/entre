import { useState } from "react";

export const Comp = () => {

    const [userInput, setUserInput] = useState('')

    return (
        <div>
            <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)} 
            type="text" />
            <p>{userInput}</p>
        </div>
    );
}