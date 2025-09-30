import React ,{useContext} from 'react'

import { CounterContext } from './A14DisplayUseContext.js'

const Child2 = () => {
     const counter = useContext(CounterContext)
  return (
    <div>
        <h2>Child2: {counter}</h2>
    </div>
  )
}

export default Child2
