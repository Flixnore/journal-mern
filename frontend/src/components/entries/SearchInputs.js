function SearchInputs(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <input
        style={{ width: "50%", fontSize: "1.3em" }}
        type="text"
        id="search"
        onChange={(e) => props.setSearch(e.target.value)}
      />
      {/* 
      <label>
        Words:
        <input type="radio" name="searchType" value="words" checked />
      </label>
      <label>
        Type:
        <input type="radio" name="searchType" value="type" />
      </label>
      <label>
        SQL:
        <input type="radio" name="searchType" value="sql" />
      </label>
    */}
    </div>
  );
}

export default SearchInputs;
