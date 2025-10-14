import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BlogList = ({ blogs, title }) => {
  return (
    <div className="BlogList">
      <h2>{title}</h2>
      <div className="home">
        {blogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
