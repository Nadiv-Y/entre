import React, { useEffect } from 'react'

const A6UseEffectMount = () => {

useEffect(()=>{
console.log('Hello Use Effect');

},[])

  return (
    <div>
      <h1>Hello Use Effect</h1>
    </div>
  )
}

export default A6UseEffectMount
