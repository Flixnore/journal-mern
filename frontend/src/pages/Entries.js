import { useState, useEffect } from "react";
import { getEntryData } from "../components/entries/getEntryData";
import Entry from "../components/entries/Entry";
import SearchAndPreviews from "../components/entries/preview/SearchAndPreviews";

import "./Entries.css";

function Entries() {
  const [currentEntryData, setCurrentEntryData] = useState({});
  const [entryID, setEntryID] = useState("");

  useEffect(() => {
    getEntryData(entryID).then((data) => setCurrentEntryData(data));
  }, [entryID]);

  return (
    <div className="container">
      <div className="item1">
        <SearchAndPreviews setEntryID={setEntryID} />
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
