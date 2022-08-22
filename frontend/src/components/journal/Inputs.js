import { useState } from "react";
import { getSettings } from "../../util";

import "./Inputs.css";

function Inputs(props) {
  let today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  getSettings().then((data) => setType(data.defaultEntryType));

  function handleTextChange(e) {
    setText(e.target.value);
    if (text.includes("::SWFPLQZM")) {
      onSubmit(date, type, title, text);
    }
  }

  function getPosition() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  async function onSubmit(date, type, title, text, e) {
    if (e) e.preventDefault();

    console.log("yeeting");
    console.log(date, type, title, text);
    let position = await getPosition(); // wait for getPosition to complete
    let lat = position ? position.coords.latitude : null;
    let long = position ? position.coords.longitude : null;

    fetch("/journalPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date,
        type: type,
        title: title,
        text: text,
        lat: lat,
        long: long,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        // TODO: error checking
        console.log(text);
        if (text === "yeeted") {
          document.getElementById("inputs").reset();
        }
      });
  }

  return (
    <div>
      <form id="inputs">
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            defaultValue={today}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="type">Type: </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <textarea
            rows="40"
            cols="130"
            id="text"
            onChange={(e) => handleTextChange(e)}
          />
        </div>
        <br />
        <button onClick={(e) => onSubmit(date, type, title, text, e)}>
          yeet it in bby
        </button>
      </form>
    </div>
  );
}

export default Inputs;
