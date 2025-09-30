import React, { useContext } from 'react'
import { CounterContext } from './A14DisplayUseContext.js'

const Child1 = () => {
    const counter = useContext(CounterContext)
  return (
    <div>
        <h2>Child1:{counter}</h2>
    </div>
  )
}

export default Child1
