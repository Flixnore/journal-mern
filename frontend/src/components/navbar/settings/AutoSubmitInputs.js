import { useEffect, useState, useRef } from "react";
import { getSettings } from "../../../util";

function AutoSubmitInputs() {
  const [loading, setLoading] = useState(true);
  const [autoSubmit, setAutoSubmit] = useState("");

  useEffect(() => {
    getSettings().then((data) => {
      setAutoSubmit(data.autoSubmit);
      setLoading(false);
    });
  }, [loading]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    fetch("/setAutoSubmit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        autoSubmit: autoSubmit,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text !== "yeeted") {
          console.log("Couldn't change auto submit");
        } else {
          console.log("Changed auto submit to " + autoSubmit);
        }
      });
  }, [autoSubmit]);

  return (
    <div className="autoSubmitInputs">
      <label>Auto Submit Text</label>
      <br />
      <input
        type="text"
        defaultValue={autoSubmit}
        onChange={(e) => setAutoSubmit(e.target.value)}
      />
    </div>
  );
}

export default AutoSubmitInputs;
