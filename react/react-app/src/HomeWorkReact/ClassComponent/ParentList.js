import React from 'react'
import PriceChiled from './PriceChiled.js'

const ParentList = ({name, description, price}) => {

  return (
    <div>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <PriceChiled price={price}/>
    </div>
  )
}

export default ParentList
