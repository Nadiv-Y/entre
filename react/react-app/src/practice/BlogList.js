import React from "react";

const BlogList = ({ blogs, title, deletBlog }) => {
  return (
    <div className="BlogList">
      <h2>{title}</h2>
      <div className="home">
        {blogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <button onClick={() => deletBlog(blog.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#f1356d"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
