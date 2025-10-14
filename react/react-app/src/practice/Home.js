import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./UseFetch";

const Home = () => {
  const { data, isLoading, error } = useFetch("http://localhost:8000/blogs");

  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    if (data) setFilteredBlogs(data);
  }, [data]);



  return (
    <div className="Home">
      {error && <div>{error}</div>}
      {isLoading && <div>loading...</div>}
      {data && (
        <BlogList
          blogs={filteredBlogs}
          title={"All blogs"}
        />
      )}
    </div>
  );
};

export default Home;
