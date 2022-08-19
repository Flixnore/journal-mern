import "./Preview.css";

function Preview(props) {
  return (
    <div>
      <span style={{ width: "50%", display: "inline-block" }}>{props.title}</span>
      <span style={{ float: "right" }}>
        {props.type} | {props.date}
      </span>
    </div>
  );
}

export default Preview;
