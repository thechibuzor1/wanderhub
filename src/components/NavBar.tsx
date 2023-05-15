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
        <button
          onClick={() => setActive("Auth")}
          className={active === "Auth" ? "right-btnActive" : "right-btn"}
        >
          Log In
        </button>
        <button
          onClick={() => setActive("GetStarted")}
          className={active === "GetStarted" ? "right-btnActive" : "right-btn"}
        >
          Get Started
        </button>
        <div className="space"></div>
      </div>
    </div>
  );
};

export default NavBar;
