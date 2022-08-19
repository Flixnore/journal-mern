import Preview from "./Preview";
import "./Preview.css"

function PreviewList(props) {
  const previews = props.data.map((data) => {
    return (
      <div key={data.entryID} className="preview" onClick={() => props.setEntry(data.entryID)}>
        <Preview date={data.date.split("T")[0]} type={data.type} title={data.title} />
      </div>
    );
  });

  return <div>{previews}</div>;
}

export default PreviewList;
