import { useEffect, useState } from "react";
import { applyTheme, getSettings } from "../../../util";

function ThemeInputs() {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    getSettings().then((data) => setTheme(data.theme));
  }, [theme]);
  let darkTrue = theme === "dark";
  console.log(darkTrue)

  function changeTheme(checked) {
    let theme = checked ? "dark" : "light";
    fetch("/setTheme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme: theme,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        // TODO: error checking
        if (text !== "yeeted") {
          console.log("Couldn't change theme", text);
        } else {
          applyTheme(theme);
        }
      });
  }

  return (
    <div
      className="themeInputs"
      onChange={(e) => changeTheme(e.target.checked)}
    >
      <label htmlFor="dark">Dark Theme! </label>
      <input type="checkbox" name="dark" defaultChecked={darkTrue} />
    </div>
  );
}

export default ThemeInputs;
