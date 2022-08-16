import Preview from "./Preview";

function PreviewList(props) {
  function date_to_string (date) {
    let d = new Date(date)
    return (d.getMonth()+1) + "-" + d.getDate()  + "-" + d.getFullYear()
  }

  const previews = props.data.map((data) => {
    return (
      <div key={data.entryID} onClick={() => props.setEntry(data.entryID)}>
        <Preview date={date_to_string(data.date)} type={data.type} title={data.title} />
      </div>
    );
  });

  return <div>{previews}</div>;
}

export default PreviewList;
