import React, { useState } from "react";
import axios from "axios";
import "./joke.css";

function Joke() {
  const [dadJoke, setDadJoke] = useState();
  const [geekJoke, setGeekJoke] = useState();
  const [chukNorrisJoke, setChukNorrisJoke] = useState();

  const jokeCategories = [
    "Misc",
    "Programming",
    "Dark",
    "Pun",
    "Spooky",
    "Christmas",
  ];
  const blackList = [
    "NSFW",
    "Religious",
    "Political",
    "Racist",
    "Sexist",
    " Explicit",
  ];
  const [jokeCategoriesState, setJokeCategoriesState] = useState(
    new Array(jokeCategories.length).fill(false)
  );
  const [blackListState, setBlackListState] = useState(
    new Array(blackList.length).fill(false)
  );

  const changeJokeCategoriesState = (position) => {
    const updatedState = jokeCategoriesState.map((item, index) =>
      index === position ? !item : item
    );

    setJokeCategoriesState(updatedState);
    console.log("jc state ", jokeCategoriesState);
  };

  const changeBlackListState = (position) => {
    const updatedState = blackListState.map((item, index) =>
      index === position ? !item : item
    );

    console.log("bl state ", blackListState);
    setBlackListState(updatedState);
  };

  const getCustomeJoke = () => {
    console.log("in");
    var baseURL = "https://v2.jokeapi.dev";
    var categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
    var params = ["blacklistFlags=nsfw,religious,racist", "idRange=0-100"];

    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      baseURL + "/joke/" + categories.join(",") + "?" + params.join("&")
    );

    xhr.onreadystatechange = function() {
      console.log("inin");
      if (xhr.readyState == 4 && xhr.status < 300) {
        // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
        console.log(JSON.parse(xhr.responseText));
        var randomJoke = JSON.parse(xhr.responseText);

        if (randomJoke.type == "single") {
          // If type == "single", the joke only has the "joke" property
          alert(randomJoke.joke);
        } else {
          // If type == "single", the joke only has the "joke" property
          alert(randomJoke.setup);
          alert(randomJoke.delivery);
        }
      } else if (xhr.readyState == 4) {
        alert(
          "Error while requesting joke.\n\nStatus code: " +
            xhr.status +
            "\nServer response: " +
            xhr.responseText
        );
      }
    };

    xhr.send();
  };

  const getDadJoke = async () => {
    const config = { headers: { Accept: "application/json" } };
    const response = await axios.get("https://icanhazdadjoke.com", config);
    setDadJoke(response.data.joke);
  };

  function getGeekJoke() {
    const options = {
      method: "GET",
      url: "https://geek-jokes.p.rapidapi.com/api",
      params: { format: "json" },
      headers: {
        "X-RapidAPI-Key": "4fb4f254dcmshee3ba62f4789d9ap17554fjsne2866961424c",
        "X-RapidAPI-Host": "geek-jokes.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function(response) {
        // console.log(response.data);
        setGeekJoke(response.data.joke);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  return (
    <div className="joke">
      {/* <div className="container">
        <div>
          <h2>Custome Joke</h2>
          <button onClick={() => getCustomeJoke()} className="jokeBtn">
            Generate
          </button>
        </div>
        <div className="options">
          <fieldset>
            <legend> Choose Categories</legend>
            {jokeCategories.map((name, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`jc-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={jokeCategoriesState[index]}
                    onChange={() => changeJokeCategoriesState(index)}
                  ></input>
                  <label htmlFor={name}>{name}</label>
                </div>
              );
            })}
          </fieldset>
          <fieldset>
            <legend> Black List</legend>
            {blackList.map((name, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`bl-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={blackListState[index]}
                    onChange={() => changeBlackListState(index)}
                  ></input>
                  <label htmlFor={name}>{name}</label>
                </div>
              );
            })}
          </fieldset>
        </div>
        <div className="display">
          <h3>{dadJoke}</h3>
        </div>
      </div> */}
      <div className="container">
        <div>
          <h2>Dad Joke</h2>
          <button
            className="jokeBtn"
            onClick={() => {
              getDadJoke();
            }}
          >
            Generate
          </button>
        </div>
        <div className="display">
          <h3>{dadJoke}</h3>
        </div>
      </div>
      <div className="container">
        <div>
          <h2>Geek Joke</h2>
          <button className="jokeBtn" onClick={() => getGeekJoke()}>
            Generate
          </button>
        </div>
        <div className="display">
          <h3>{geekJoke}</h3>
        </div>
      </div>
    </div>
  );
}

export default Joke;
