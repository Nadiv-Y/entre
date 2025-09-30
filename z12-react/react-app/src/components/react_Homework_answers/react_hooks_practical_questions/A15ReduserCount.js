import React, { useReducer } from 'react'

const A15ReduserCount = () => {


const reducer = (state,action)=>{
switch (action) {
    case 'Plus':
       return state +1
    case 'Minus':
        
       return state -1

    default:
      return state
}
}
const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <button onClick={()=> dispatch('Plus')}>Plus</button>
      <button onClick={()=> dispatch('Minus')}>Minus</button>
      {state}
    </div>
  )
}

export default A15ReduserCount
