import Preview from "./Preview";

function PreviewList(props) {
  const previews = props.data.map((data) => {
    return (
      <div key={data.entryID} onClick={() => props.getEntry(data.entryID)}>
        <Preview date={data.date} type={data.type} title={data.title} />
      </div>
    );
  });

  return <div>{previews}</div>;
}

export default PreviewList;
