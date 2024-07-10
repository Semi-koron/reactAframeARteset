import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <a-scene embedded arjs="sourceType: webcam;">
        <a-sphere color="yellow" radius="0.4"></a-sphere>
        <a-marker-camera
          type="pattern"
          url="./pattern-hackU.patt"
          id="marker"
        ></a-marker-camera>
      </a-scene>
    </>
  );
}

export default App;
