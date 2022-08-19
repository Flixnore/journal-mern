export function getEntryData(entryID, format=true) {
  console.log("getEntryData", entryID)
  if (entryID === "") return Promise.resolve({});

  return fetch("http://localhost:5000/getEntries?entryID=" + entryID)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data = data[0]; // using entryID deterministically yields one result
      // Correctly render line breaks
      if (format) {
        data.text = data.text.replace(/\n{2}/g, "&nbsp;</p><p>");
        data.text = data.text.replace(/\n/g, "&nbsp;<br />");
        data.text = "<p>" + data.text + "</p>";
      }
      return data;
    });
}
