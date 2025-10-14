import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./UseFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BlogsDetails = () => {
  const { id } = useParams();

  const history = useHistory()
  
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const hendleDelete = ()=>{
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(()=>{
      console.log('user delete blog' + blog.id);
      history.push('/')
    }) 
  }

  return (
    <div className="blogDetails">
      {isLoading && <div>Loading...</div>}
      {error && <div> {error}</div>}
      {blog?.title && (
        <article>
          <h2> {blog.title}</h2>
          <p> written by {blog.author}</p>
          <div>{blog.body}</div>
        </article>
      )}
      {blog?.title && <button onClick={hendleDelete} >Delete</button>}
    </div>
  );
};

export default BlogsDetails;
