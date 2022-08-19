import "./Entry.css"

function Entry(props) {
  return (
    <div className="entry">
      <div style={{fontWeight: "bold"}}>
        {props.title && props.title + " | " + props.date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
    </div>
  );
}

export default Entry;
