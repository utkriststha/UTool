import React, { useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./navbar.css";

function Navbar({ setTool, menu }) {
  const [menuBar, setMenuBar] = useState(false);
  const tools = useRef();
  const toggleMenu = () => {
    setMenuBar(!menuBar);
    tools.current.classList.toggle("openBar");
  };

  return (
    <div className="navBar">
      <div className="header">
        <i className="navIcon" onClick={() => toggleMenu()}>
          {menuBar ? <FaIcons.FaTimes /> : <FaIcons.FaBars />}
        </i>
        <h1>
          <span>U</span>
          .Tool
        </h1>
      </div>
      <div ref={tools} className="tools">
        <button
          className={menu === 1 ? "active" : ""}
          onClick={() => {
            setTool(1);
            toggleMenu();
          }}
        >
          Calculator
        </button>
        <button
          className={menu === 2 ? "active" : ""}
          onClick={() => {
            setTool(2);
            toggleMenu();
          }}
        >
          BMI Calculator
        </button>
        <button
          className={menu === 3 ? "active" : ""}
          onClick={() => {
            setTool(3);
            toggleMenu();
          }}
        >
          Counter
        </button>
        <button
          className={menu === 4 ? "active" : ""}
          onClick={() => {
            setTool(4);
            toggleMenu();
          }}
        >
          Joke Generator
        </button>
        <button
          className={menu === 5 ? "active" : ""}
          onClick={() => {
            setTool(5);
            toggleMenu();
          }}
        >
          Currency Converter
        </button>
      </div>
    </div>
  );
}

export default Navbar;
