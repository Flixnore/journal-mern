function Entry(props) {
  return (
    <div>
      <div>
        {props.title} | {props.date}
      </div>
      <div>{props.text}</div>
    </div>
  );
}

export default Entry;
