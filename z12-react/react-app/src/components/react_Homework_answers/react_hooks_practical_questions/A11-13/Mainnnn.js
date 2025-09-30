import React, { useContext } from 'react'
import { ThemeContext } from './See'

const Mainnnn = () => {
  const theme = useContext(ThemeContext)
  return (
    <main  style={{ backgroundColor: theme === false ? " #372f2fff" : " #af6b6bff" ,border: `1px solid${theme === false ?'#948': '#951'}` } }>
      <div style={{ color: theme === false ? " #e0babaff" : " #662222ff" }}>I am main!!</div>
    </main>
  )
}

export default Mainnnn
