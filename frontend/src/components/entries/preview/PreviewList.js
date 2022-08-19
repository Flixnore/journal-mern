import Preview from "./Preview";
import "./Preview.css"

function PreviewList(props) {
  function date_to_string (date) {
    let d = new Date(date)
    return (d.getMonth()+1) + "-" + d.getDate()  + "-" + d.getFullYear()
  }

  const previews = props.data.map((data) => {
    return (
      <div key={data.entryID} className="preview" onClick={() => props.setEntryID(data.entryID)}>
        <Preview date={date_to_string(data.date)} type={data.type} title={data.title} />
      </div>
    );
  });

  return <div>{previews}</div>;
}

export default PreviewList;
