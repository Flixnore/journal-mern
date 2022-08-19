import "./Entry.css"

function Entry(props) {
  function date_to_string (date) {
    let d = new Date(date)
    return (d.getMonth()+1) + "-" + d.getDate()  + "-" + d.getFullYear()
  }

  return (
    <div className="entry">
      <div style={{fontWeight: "bold"}}>
        {props.title && props.title + " | " + date_to_string(props.date)}
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
    </div>
  );
}

export default Entry;
