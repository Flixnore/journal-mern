import { useEffect } from "react";

function Entry(props) {
  useEffect(() => {
    console.log("props change")
    console.log(props)
  }, [props])
  return (
    <div>
      <div id="asdf">
        {props.title} | {props.date}
      </div>
      <div>{props.text}</div>
    </div>
  );
}

export default Entry;
