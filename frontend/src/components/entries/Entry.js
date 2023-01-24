import "./Entry.css";

function Entry(props) {
  return (
    <div className="entry">
      {props.title && (
        <div>
          <button onClick={() => props.setEntry(props.entryID - 1)}>
            Previous
          </button>{" "}
          |{" "}
          <button onClick={() => props.setEntry(props.entryID + 1)}>
            Next
          </button>{" "}
          |{" "}
          <button
            onClick={() =>
              props.setEntry(Math.floor(Math.random() * props.maxEntryID))
            }
          >
            Random
          </button>
          <br />
          <br />
        </div>
      )}
      <div style={{ fontWeight: "bold" }}>
        {props.title && props.title + " | " + props.date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
    </div>
  );
}

export default Entry;
