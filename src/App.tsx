import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./clash-grotesk.css";
import "./satoshi.css";
import "./App.css";
import Test from "./components/test";
import NavBar from "./components/NavBar";
import Lottie from "lottie-react";
import splas from "./assets/2523-loading.json";

function App() {
  const [splash, setSplash] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 4500);
  }, []);
  return (
    <>
      {splash ? (
        <div className="swoop">
          <Lottie className="intro_logo" animationData={splas} />
        </div>
      ) : (
        <>
          <NavBar />
          <Test />
        </>
      )}
    </>
  );
}

export default App;
