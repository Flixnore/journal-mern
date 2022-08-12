import Inputs from "../components/journal/Inputs";

function Journal() {
  function onSubmit(date, type, title, text) {
    console.log("yeety");
    console.log(date, type, title, text);
    fetch("http://localhost:5000/journalPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date,
        type: type,
        title: title,
        text: text,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((text) => {
        console.log(text);
      });
  }
  return (
    <div>
      <Inputs onSubmit={onSubmit} />
    </div>
  );
}

export default Journal;
