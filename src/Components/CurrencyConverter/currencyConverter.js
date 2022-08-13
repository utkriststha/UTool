import React, { useState, useEffect } from "react";
import axios from "axios";
import "./currencyConverter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import CurrencyList from "./currencyList";

function CurrencyConverter() {
  const [convFrom, setConvFrom] = useState("AUD");
  const [convTo, setConvTo] = useState("NPR");
  const [amount, setAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [fromAmount, setFromAmount] = useState(1);
  const [isFrom, setisFrom] = useState(true);
  const [isFromBtn, setisFromBtn] = useState(true);
  const currencyList = [...Object.keys(CurrencyList)];

  useEffect(() => {
    if (isFrom || isFromBtn) {
      setFromAmount(amount);
      convert(convFrom, convTo, amount, isFrom);
    } else {
      setToAmount(amount);
      convert(convTo, convFrom, amount, isFrom);
    }
    function convert(from, to, amount, isFrom) {
      const options = {
        method: "GET",
        url: "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency",
        params: { have: from, want: to, amount: amount },
        headers: {
          "X-RapidAPI-Key":
            "4fb4f254dcmshee3ba62f4789d9ap17554fjsne2866961424c",
          "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          isFrom
            ? setToAmount(response.data.new_amount)
            : setFromAmount(response.data.new_amount);
        })
        .catch(function (error) {
          console.error(error);
          setToAmount(0);
          setFromAmount(0);
        });
    }
  }, [amount, convFrom, convTo]);

  const changedFrom = (amount) => {
    setAmount(amount);
    setisFrom(true);
  };

  const changedTo = (amount) => {
    setAmount(amount);
    setisFrom(false);
  };

  return (
    <div className="currencyConverter">
      <div className="exBlock">
        <div className="exInput">
          <input
            type="number"
            placeholder="0"
            required
            step="any"
            min="0"
            value={fromAmount}
            onChange={(e) => changedFrom(e.target.value)}
          />
          <select
            value={convFrom}
            onChange={(e) => {
              setisFromBtn(true);
              setConvFrom(e.target.value);
            }}
          >
            {currencyList.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="exIcon">
          <FontAwesomeIcon icon={faRightLeft} />
        </span>
        <div className="exInput">
          <input
            type="number"
            placeholder="0"
            required
            step="any"
            min="0"
            value={toAmount}
            onChange={(e) => changedTo(e.target.value)}
          />
          <select
            value={convTo}
            onChange={(e) => {
              setisFromBtn(false);
              setConvTo(e.target.value);
            }}
          >
            {currencyList.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
