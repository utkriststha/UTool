import React, { useState } from "react";
import "./bmi.css";

function BMI() {
  // state
  const [som, setSOM] = useState(1);
  const [weightLBS, setWeightLBS] = useState(0);
  const [heightFT, setHeightFT] = useState(0);
  const [heightINC, setHeightINC] = useState(0);
  const [weightKG, setWeightKG] = useState(0);
  const [heightCM, setHeightCM] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [health, setHealth] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const calcBmi = (event) => {
    //prevent submitting
    event.preventDefault();

    if (weightKG === 0.0 || heightCM === 0.0) {
      setErrorMessage("The value cannot be 0");
    } else if (
      !(
        (weightKG >= 30.0 && weightKG <= 300.0) ||
        (weightLBS >= 66.15 && weightLBS <= 551.25)
      )
    ) {
      setErrorMessage(
        " Weigth should be between 30kg - 300kg or 66.15lbs - 551.25lbs"
      );
    } else if (
      !(
        (heightCM >= 91 && heightCM <= 271.78) ||
        (heightFT >= 3 && heightFT <= 8)
      )
    ) {
      setErrorMessage("Height should be between 91cm - 271.78cm or 3ft - 8ft");
    } else {
      setErrorMessage("");
      setAllHeight(1);
      setAllWeight(1);
      let bmi = (weightKG / (heightCM * heightCM)) * 10000;
      setBmi(bmi.toFixed(1));

      if (bmi < 19) {
        setHealth("UnderWeight");
        setMessage(
          "Your weight is less than it ideally should be. See your doctor or health professional and discuss whether you may need to aim at gaining weight. They can help you think of small, practical changes you feel comfortable with to achieve a healthy weight."
        );
      } else if (bmi >= 19 && bmi < 25) {
        setHealth("Healthy");
        setMessage(
          "Your BMI is currently within what is considered a healthy weight range. Being a healthy weight has important benefits as it can help reduce your risk of heart disease, diabetes and a range of other conditions."
        );
      } else if (bmi >= 25 && bmi < 30) {
        setHealth("Overweight");
        setMessage(
          "Your weight appears to be a bit above the ideal range. You might like to talk to your doctor about whether you need to set yourself a new target for a healthy weight. If you are at all concerned or have any health problems, check with your doctor before you start any new exercise programs or eating plans."
        );
      } else {
        setHealth("Obese");
        setMessage(
          "You currently weigh more than is ideal. This puts your health at risk and is of increasing concern, particularly as you get older. Talk to your doctor about your BMI and discuss an appropriate and healthy weight for you."
        );
      }
    }
  };

  let reload = () => {
    setHeightCM(0);
    setHeightFT(0);
    setHeightINC(0);
    setWeightKG(0);
    setWeightLBS(0);
    setBmi(0);
    setMessage("");
    setErrorMessage("");
    setHealth("");
  };

  const setAllHeight = (som) => {
    if (som === 2) {
      const inches = heightCM / 2.54;
      setHeightFT(Math.floor(inches / 12));
      setHeightINC((inches % 12).toFixed(2));
    } else {
      setHeightCM((heightFT * 30.48 + heightINC * 2.54).toFixed(0));
    }
  };

  const setAllWeight = (som) => {
    if (som === 2) {
      setWeightLBS((weightKG / 0.45359237).toFixed(2));
    } else {
      setWeightKG((weightLBS * 0.45359237).toFixed(2));
    }
  };

  return (
    <div className="bmi">
      <div className="container">
        <div className="som">
          <button
            onClick={() => {
              setSOM(1);
              setAllHeight(1);
              setAllWeight(1);
            }}
            className={som === 1 ? "active" : ""}
          >
            Metric
          </button>
          <button
            onClick={() => {
              setSOM(2);
              setAllHeight(2);
              setAllWeight(2);
            }}
            className={som === 2 ? "active" : ""}
          >
            Imperial
          </button>
        </div>
        <form>
          <div>
            <label>Weight</label>
            <div className="inputBar">
              {som === 1 ? (
                <>
                  <input
                    type="number"
                    placeholder="0"
                    value={weightKG}
                    required
                    step="any"
                    min="30"
                    max="300"
                    onChange={(e) => {
                      setWeightKG(e.target.value);
                    }}
                  />
                  <span>kg</span>
                </>
              ) : (
                <>
                  <input
                    type="number"
                    placeholder="0"
                    value={weightLBS}
                    required
                    step="any"
                    min="66.15"
                    max="661.39"
                    onChange={(e) => {
                      setWeightLBS(e.target.value);
                    }}
                  />
                  <span>lbs</span>
                </>
              )}
            </div>
          </div>

          <div>
            <label>Height</label>

            {som === 1 ? (
              <div className="inputBar">
                <input
                  type="number"
                  placeholder="0"
                  value={heightCM}
                  required
                  step="any"
                  min="91"
                  max="271.78"
                  onChange={(event) => {
                    setHeightCM(event.target.value);
                  }}
                />
                <span>cm</span>
              </div>
            ) : (
              <>
                <div className="inputBar">
                  <input
                    type="number"
                    placeholder="0"
                    value={heightFT}
                    required
                    step="any"
                    min="3"
                    max="8"
                    onChange={(event) => {
                      setHeightFT(event.target.value);
                    }}
                  />
                  <span>ft</span>
                </div>
                <div className="inputBar">
                  <input
                    type="number"
                    placeholder="0"
                    required
                    step="any"
                    min="0"
                    max="11"
                    value={heightINC}
                    onChange={(event) => {
                      setHeightINC(event.target.value);
                    }}
                  />
                  <span>in</span>
                </div>
              </>
            )}
          </div>
          <div className="action">
            <button type="submit" onClick={calcBmi}>
              Submit
            </button>
            <button onClick={reload}>Reset</button>
          </div>
        </form>
      </div>
      {errorMessage ? (
        <div className="messageBox error">
          <h2 className="errorMessage">{errorMessage}</h2>
        </div>
      ) : (
        ""
      )}

      {bmi ? (
        <div className="messageBox">
          <h2>Your BMI Result</h2>
          <div>
            <div>
              <h3>{health}</h3>
              <p>{message}</p>
            </div>
            <h3 className="bmiResult">{bmi}</h3>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BMI;
