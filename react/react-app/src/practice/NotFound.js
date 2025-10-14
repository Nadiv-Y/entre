import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const NotFound = () => {
  return (
    <div className='notFound'>
      <h2>sorry</h2>
      <p>This page cannot found</p>
      <Link to='/'>Back to home page</Link>
    </div>
  )
}

export default NotFound
