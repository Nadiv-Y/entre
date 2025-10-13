import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navBar">
        <h1>The Oliver Blog</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link
            to="/create"
            style={{
              color: "white",
              backgroundColor: "#f1356d",
              borderRadius: "8px",
            }}
          >
            New Blog
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
