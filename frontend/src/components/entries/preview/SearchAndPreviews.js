import {useState, useEffect} from "react";
import Search from "./Search";
import PreviewList from "./PreviewList";

function SearchAndPreviews(props) {
  const [loading, setLoading] = useState(true);

  const [previewsData, setPreviewsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  if (loading) {
    return <div>loading</div>;
  }
  console.log(props.setEntryID)

  return (
    <>
      <Search setSearch={setSearchInput} />
      <br />
      <PreviewList
        search={searchInput}
        data={previewsData}
        setEntryID={props.setEntryID}
      />
    </>
  );
}

export default SearchAndPreviews;
