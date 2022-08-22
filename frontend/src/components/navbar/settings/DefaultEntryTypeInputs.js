import { useEffect, useState } from "react";
import { getSettings } from "../../../util";

function ThemeInputs() {
  const [loading, setLoading] = useState(true);
  const [defaultEntryType, setDefaultEntryType] = useState("");
  useEffect(() => {
    getSettings().then((data) => {
      setDefaultEntryType(data.defaultEntryType);
      setLoading(false);
    });
  }, [loading]);

  useEffect(() => {
    if (defaultEntryType === "") return;

    fetch("/setDefaultEntryType", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        defaultEntryType: defaultEntryType,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text !== "yeeted") {
          console.log("Couldn't change default entry type");
        } else {
          console.log("Changed default entry type to " + defaultEntryType);
        }
      });
  }, [defaultEntryType]);

  return (
    <div className="defaultEntryTypeInputs">
      <label>Default Entry Type</label>
      <br />
      <input
        type="text"
        defaultValue={defaultEntryType}
        onChange={(e) => setDefaultEntryType(e.target.value)}
      />
    </div>
  );
}

export default ThemeInputs;
