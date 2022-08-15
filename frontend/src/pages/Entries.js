import { useState, useEffect } from "react";
import PreviewList from "../components/entries/PreviewList";
import SearchInputs from "../components/entries/SearchInputs";
import Entry from "../components/entries/Entry";

function Entries() {
  const [loading, setLoading] = useState(true);

  const [previewsData, setPreviewsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [currentEntryData, setCurrentEntryData] = useState({});
  const [entryID, setEntryID] = useState("");

  // Get list of all entries
  useEffect(() => {
    fetch("http://localhost:5000/getPreviews?search=" + searchInput)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPreviewsData(data);
        setLoading(false);
      });
  }, [loading, searchInput]);

  useEffect(() => {
    if (entryID === "") return

    console.log("here", entryID);
    fetch("http://localhost:5000/getEntry?entryID=" + entryID)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrentEntryData(data);
      });
  }, [entryID]);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <SearchInputs setSearch={setSearchInput} />
      <PreviewList
        search={searchInput}
        data={previewsData}
        setEntry={setEntryID}
      />
      <Entry
        title={currentEntryData.title}
        date={currentEntryData.date}
        text={currentEntryData.text}
      />
    </div>
  );
}

export default Entries;
