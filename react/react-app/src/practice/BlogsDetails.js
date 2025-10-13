import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./UseFetch";

const BlogsDetails = () => {
  const { id } = useParams();
  
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch("http://localhost:8000/blogs/" + id);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div> {error}</div>}
      {blog?.title && (
        <article>
          <h2> {blog.title}</h2>
          <p> written by {blog.author}</p>
          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
};

export default BlogsDetails;
