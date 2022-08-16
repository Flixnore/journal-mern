import { useState } from "react";

function Inputs(props) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("test");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function handleTextChange (e) {
    setText(e.target.value)
    if (text.includes("::SWFPLQZM")) {
      props.onSubmit(date, type, title, text)
    }
  }

  let today = new Date().toISOString().split('T')[0]

  return (
    <div>
      <div>
        <label htmlFor="date">Date: </label>
        <input type="date" id="date" defaultValue={today} onChange={(e) => {setDate(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="type">Type: </label>
        <input type="text" id="type" value={type} onChange={(e) => {setType(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" onChange={(e) => {setTitle(e.target.value)}} />
      </div>
      <div>
        <textarea rows="40" cols="130" id="text" onChange={(e) => handleTextChange(e)} />
      </div>
      <button onClick={() => props.onSubmit(date, type, title, text)}>yeet it in bby</button>
    </div>
  );
}

export default Inputs;
