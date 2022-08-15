function Entry(props) {
  return (
    <div>
      <div>
        {props.title} | {props.date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
    </div>
  );
}

export default Entry;
