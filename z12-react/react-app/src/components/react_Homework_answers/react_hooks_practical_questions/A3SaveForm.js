import React, { useState } from 'react'

const A3SaveForm = () => {
    const [ text, setState]= useState('')
  return (
    <div>
      <form>
      <input onChange={(event)=>setState(event.target.value)}/>
      <div>{text}</div>
      
      </form>
    </div>
  )
}

export default A3SaveForm
