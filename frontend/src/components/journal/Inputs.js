import { useEffect, useState } from "react";
import { getSettings } from "../../util";
import moment from 'moment';

import "./Inputs.css";

function Inputs(props) {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [type, setType] = useState("");
  const [autoSubmit, setAutoSubmit] = useState("");
  const [loadedType, setLoadedType] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState(localStorage.getItem("text") || "");

  useEffect(() => {
    getSettings().then((data) => {
      setType(data.defaultEntryType);
      setAutoSubmit(data.autoSubmit);
    });
    setLoadedType(true);
  }, [loadedType]);

  function handleTextChange(e) {
    setText(e.target.value);
  }

  useEffect(() => {
    localStorage.setItem("text", text);
    if (text.includes(autoSubmit) && autoSubmit != "") {
      onSubmit(date, type, title, text);
    }
  }, [text]);

  function getPosition() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  async function onSubmit(date, type, title, text, e) {
    if (e) e.preventDefault();

    console.log("yeeting");
    console.log(date, type, title, text);
    /*
    let position = await getPosition(); // wait for getPosition to complete
    let lat = position ? position.coords.latitude : null;
    let long = position ? position.coords.longitude : null;
    */

    fetch("/journalPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date,
        type: type,
        title: title,
        text: text,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        // TODO: error checking
        console.log(response);
        if (response === "yeeted") {
          localStorage.clear()
          setText("")
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
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="type">Type: </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <div>
          <textarea
            rows="40"
            cols="130"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
