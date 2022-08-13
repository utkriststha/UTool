import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperandButton from "./OperandButton";
import "./calculator.css";

export const ACTION = {
  CLEAR: "clear",
  ADD_DIGIT: "add_digit",
  DELETE: "delete",
  OPERATOR: "operator",
  EQUALS: "equals",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.canOverwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          canOverwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      } else if (payload.digit === "." && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: "0.",
        };
      } else if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTION.OPERATOR:
      if (state.currentOperand == null && state.preOperand == null) {
        return state;
      }
      if (state.preOperand == null) {
        return {
          ...state,
          operator: payload.operator,
          preOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operator: payload.operator,
        };
      }
      return {
        ...state,
        preOperand: evaulate(state),
        operator: payload.operator,
        currentOperand: null,
      };
    case ACTION.CLEAR:
      return {};
    case ACTION.DELETE:
      if (state.canOverwrite) {
        return {
          ...state,
          canOverwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return state;
      }

      return {
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTION.EQUALS:
      if (
        (state.operator !== null && state.currentOperand !== null) ||
        state.preOperand !== null
      ) {
        return {
          ...state,
          currentOperand: evaulate(state),
          preOperand: null,
          operator: null,
          canOverwrite: true,
        };
      }
      return state;
    default:
      return state;
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function evaulate({ currentOperand, preOperand, operator }) {
  const preNum = parseFloat(preOperand);
  const currentNum = parseFloat(currentOperand);
  if (isNaN(preNum) || isNaN(currentNum)) {
    return "";
  }
  let equvalent = "";
  switch (operator) {
    case "+":
      equvalent = preNum + currentNum;
      break;
    case "-":
      equvalent = preNum - currentNum;
      break;
    case "/":
      equvalent = preNum / currentNum;
      break;
    case "*":
      equvalent = preNum * currentNum;
      break;
    default:
      equvalent = "";
  }
  return equvalent;
}

function numberFormatter(operand) {
  if (operand == null) {
    return;
  }
  const [integer, decimal] = operand.toString().split(".");
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function Calculator() {
  const [{ currentOperand, preOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator">
      <div className="output">
        <div className="pre-operand">
          {" "}
          {numberFormatter(preOperand)} {operator}
        </div>
        <div className="current-operand">{numberFormatter(currentOperand)}</div>
      </div>
      <button
        className="hightlight1 span-two"
        onClick={() => dispatch({ type: ACTION.CLEAR })}
      >
        AC
      </button>
      <button
        className="hightlight1"
        onClick={() => dispatch({ type: ACTION.DELETE })}
      >
        DEL
      </button>
      <OperandButton operator="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperandButton operator="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperandButton operator="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperandButton operator="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className=" highlight2 span-two"
        onClick={() => dispatch({ type: ACTION.EQUALS })}
      >
        =
      </button>
    </div>
  );
}

export default Calculator;
