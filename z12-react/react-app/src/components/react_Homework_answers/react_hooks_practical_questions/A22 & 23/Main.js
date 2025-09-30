import React, { useState } from 'react'
import Child from './Child'

const Main = () => {
const [state , setState]= useState(0)
  return (
    <div>
        {console.log('main rendered')}
        <button onClick={()=> setState(state +1)}>iiii</button>
        <h1>{state}</h1>
      <Child />
    </div>
  )
}

export default Main
