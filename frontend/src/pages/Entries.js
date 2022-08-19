import { useState, useEffect } from "react";
import PreviewList from "../components/entries/preview/PreviewList";
import SearchInputs from "../components/entries/preview/SearchInputs";
import Entry from "../components/entries/Entry";

import "./Entries.css";

function Entries() {
  const [loading, setLoading] = useState(true);

  const [previewsData, setPreviewsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [currentEntryData, setCurrentEntryData] = useState({});
  const [entryID, setEntryID] = useState("");

  // Get list of all entries
  useEffect(() => {
    fetch("http://localhost:5000/getEntries?words=" + searchInput)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPreviewsData(data);
        setLoading(false);
      });
  }, [loading, searchInput]);

  useEffect(() => {
    if (entryID === "") return;

    fetch("http://localhost:5000/getEntries?entryID=" + entryID)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data[0]; // using entryID deterministically yields one result
        // Correctly render line breaks
        data.text = data.text.replace(/\n{2}/g, "&nbsp;</p><p>");
        data.text = data.text.replace(/\n/g, "&nbsp;<br />");
        data.text = "<p>" + data.text + "</p>";
        setCurrentEntryData(data);
      });
  }, [entryID]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="container">
      <div className="item1">
        <SearchInputs setSearch={setSearchInput} />
        <br />
        <PreviewList
          search={searchInput}
          data={previewsData}
          setEntry={setEntryID}
        />
      </div>
      <div className="item2">
        <Entry
          title={currentEntryData.title}
          date={currentEntryData.date}
          text={currentEntryData.text}
        />
      </div>
    </div>
  );
}

export default Entries;
