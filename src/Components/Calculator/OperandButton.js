import { ACTION } from "./calculator";
import React from "react";
function OperandButton({ dispatch, operator }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTION.OPERATOR, payload: { operator } });
      }}
    >
      {operator}
    </button>
  );
}

export default OperandButton;
