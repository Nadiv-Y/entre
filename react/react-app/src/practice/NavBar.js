import React from "react";


const NavBar = () => {
  return (
    <div>
      <nav className="navBar">
        <h1>The Oliver Blog</h1>
        <div className="links" >
        <a href="/">Home</a>    
        <a href="/create" style={{
          color: "white",
          backgroundColor: "#f1356d",
          borderRadius: "8px"
        }}>New Blog</a>    
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
