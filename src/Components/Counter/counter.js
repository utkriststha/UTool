import "./counter.css";
import React, { useReducer, useState } from "react";

const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
  ADD_COUNT: "add-count",
  SUB_COUNT: "sub-count",
};

const reducer = (count, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return count + 1;
    case ACTION.DECREMENT:
      return count - 1;
    case ACTION.RESET:
      return 0;
    case ACTION.ADD_COUNT:
      return count + action.payload.amount;
    case ACTION.SUB_COUNT:
      return count - action.payload.amount;
    default:
      return count;
  }
};

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [addAmount, setAddAmount] = useState(5);
  const [subAmount, setSubAmount] = useState(5);
  const [error, setError] = useState("");

  const sendDispatchNoError = (type, amount) => {
    setError("");
    console.log(amount % 1 === 0);
    dispatch({
      type: type,
      payload: { amount: amount },
    });
  };

  return (
    <div className="counter">
      {error ? (
        <div className="error">
          <h2 className="errorMessage">{error}</h2>
        </div>
      ) : (
        ""
      )}
      <span>{count}</span>
      <div className="btnContainer">
        <button
          className="actionBtn"
          onClick={() => dispatch({ type: ACTION.INCREMENT })}
        >
          {" "}
          +{" "}
        </button>
        <button
          className="actionBtn"
          onClick={() => dispatch({ type: ACTION.DECREMENT })}
        >
          {" "}
          -{" "}
        </button>
      </div>
      <div className="btnContainer">
        <div className="changeBtn">
          <button
            onClick={() =>
              parseInt(addAmount) > 0 && !addAmount.includes(".")
                ? sendDispatchNoError(ACTION.ADD_COUNT, parseInt(addAmount))
                : setError("Add amount should be positive whole number")
            }
          >
            Add
          </button>
          <input
            type="number"
            placeholder="5"
            value={addAmount}
            required
            step="any"
            min="0"
            onChange={(e) => {
              setAddAmount(e.target.value);
            }}
          />
        </div>
        <div className="changeBtn">
          <button
            onClick={() =>
              parseInt(subAmount) > 0 && !subAmount.includes(".")
                ? sendDispatchNoError(ACTION.SUB_COUNT, parseInt(subAmount))
                : setError("Subtract amount should be positive whole number")
            }
          >
            Subtract
          </button>
          <input
            type="number"
            placeholder="5"
            value={subAmount}
            required
            step="any"
            min="0"
            onChange={(e) => {
              setSubAmount(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className="reset"
        onClick={() => {
          setError("");
          dispatch({ type: ACTION.RESET });
        }}
      >
        {" "}
        Reset{" "}
      </button>
    </div>
  );
}

export default Counter;
