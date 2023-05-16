import React, { useState } from "react";
import "./NavBarCss.css";

const NavBar = () => {
  const [active, setActive] = useState("GetStarted");

  return (
    <div className="header">
      <div className="header-text">
        <div className="space"></div>
        <p onClick={() => setActive("GetStarted")}>Wanderhub</p>
      </div>
      <div className="right-btns">
        
      </div>
    </div>
  );
};

export default NavBar;
