import React from 'react'

const Child = ({callback}) => {
  return (
    <div>
     { callback()}
    </div>
  )
}

export default React.memo(Child) 
