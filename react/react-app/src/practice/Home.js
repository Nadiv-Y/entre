import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  const deletBlog = (id) => {
    console.log("delte button clicked", id);

    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/blogs")
        .then((res) => {
          if (!res.ok) {
            throw new Error("could not fetch the data");
          }
          return res.json();
        })
        .then((data) => {
          setBlogs(data);
          setIsLoading(false);
          setError([]);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <div className="Home">
      {error && <div>{error}</div>}
      {isLoading && <div>loading...</div>}
      {blogs && (
        <BlogList blogs={blogs} title={"All blogs"} deletBlog={deletBlog} />
      )}
    </div>
  );
};

export default Home;
