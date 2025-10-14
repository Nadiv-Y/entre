import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Aiman Shomery')
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    const hendleSubmit = (e)=>{
        e.preventDefault()

        const blog = {title, body, author}

        setIsLoading(true)

        fetch("http://localhost:8000/blogs", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{console.log('new blog added');
            setIsLoading(false)
            history.push('/')
        })
        
    }

  return (
    <div className='create'>
    <h2>Add New Blog</h2>
      <form onSubmit={hendleSubmit}>
        <label>Blog Title: </label>
        <input
        type='text'
        required
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        ></input>
        <label>Blog Body: </label>
        <textarea
        required
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        ></textarea>
        <label>Blog Author: </label>
        <select
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
        >
            <option value='Aiman Shomery'>Aiman Shomery</option>
            <option value='Yotam Lemer'>Yotam Lemer</option>
        </select>
        {!isLoading && <button>Add Blog</button>}
        {isLoading && <button disabled >Addeding Blog...</button>}
      </form>
    </div>
  )
}

export default Create
