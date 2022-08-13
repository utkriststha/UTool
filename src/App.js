import "./App.css";
import BMI from "./Components/BMI/bmi";
import Navbar from "./Components/Navbar/navbar";
import Calculator from "./Components/Calculator/calculator";
import Counter from "./Components/Counter/counter";
import Joke from "./Components/JokeGenerator/joke";
import CurrencyConverter from "./Components/CurrencyConverter/currencyConverter";
import { useState } from "react";
import React from "react";

function App() {
  const [menu, setMenu] = useState(1);

  let setTool = (tool) => {
    setMenu(tool);
  };

  return (
    <div className="App">
      <Navbar setTool={setTool} menu={menu} />
      <div className="display">
        {menu === 1 && <Calculator />}
        {menu === 2 && <BMI />}
        {menu === 3 && <Counter />}
        {menu === 4 && <Joke />}
        {menu === 5 && <CurrencyConverter />}
      </div>
    </div>
  );
}

export default App;
