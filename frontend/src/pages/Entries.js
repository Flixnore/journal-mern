import { useState, useEffect } from "react";
import PreviewList from "../components/entries/PreviewList";
import SearchInputs from "../components/entries/SearchInputs";

function Entries() {
  const [loading, setLoading] = useState(true);
  const [previewsData, setPreviewsData] = useState([]);

  const [currentEntryData, setCurrentEntryData] = useState({})

  // Get list of all entries
  useEffect(() => {
    fetch("http://localhost:5000/getPreviews")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPreviewsData(data);
        setLoading(false);
      });
  }, [loading]);

  if (loading) {
    return <div>loading</div>;
  }

  function getEntry (entryID) {
    console.log("here", entryID)
    fetch("http://localhost:5000/getEntry?entryID=" + entryID)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setCurrentEntryData(data);
      });
  }

  console.log(currentEntryData)

  return (
    <div>
      <SearchInputs />
      <PreviewList data={previewsData} getEntry={getEntry} />
      {/* TOOD: use Entry component, can't get it to rerender... */}
      <div>
        <div id="asdf">
          {currentEntryData.title} | {currentEntryData.date}
        </div>
        <div>{currentEntryData.text}</div>
      </div>
    </div>
  );
}

export default Entries;
