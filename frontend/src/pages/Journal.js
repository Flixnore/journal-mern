import { useState } from "react";

import Inputs from "../components/journal/Inputs";
import SearchAndPreviews from "../components/entries/preview/SearchAndPreviews";

import "./Journal.css";

function Journal() {
  const [entryID, setEntryID] = useState("");

  return (
    <div className="container">
      <div className="item1">
        <Inputs entryID={entryID} />
      </div>
      <div className="item2">
        <SearchAndPreviews setEntryID={setEntryID} />
      </div>
    </div>
  );
}

export default Journal;
