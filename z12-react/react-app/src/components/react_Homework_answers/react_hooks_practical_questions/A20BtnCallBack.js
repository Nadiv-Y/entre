import React, { useCallback ,useState} from 'react'

const A20BtnCallBack = () => {
const [counter, setCounter] = useState(0);

    const btnCallBack = useCallback(()=>setCounter(prev => prev+1),[])
  return (
    <div>
      <button type='button' onClick={()=>btnCallBack()}>counter</button>
      {counter}
    </div>
  )
}

export default A20BtnCallBack
