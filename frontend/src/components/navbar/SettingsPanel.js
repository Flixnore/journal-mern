import { useState, useEffect } from "react";
import { getSettings } from "../../util";
import "./SettingsPanel.css";

function SettingsPanel() {
  const [loading, setLoading] = useState(true);
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [db, setDb] = useState("");


  useEffect(() => {
    getSettings().then((data) => {
      console.log(data)
      setHost(data.host);
      setUser(data.user);
      setPassword(data.password);
      setDb(data.database);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  } , [loading]);
  return (
    <div className="panel">
      {/* display two radio buttons for theme */}
      <div className="themeInputs">
        <label htmlFor="light">Light </label>
        <input type="radio" name="theme" value="light" />
        <label htmlFor="dark">Dark </label>
        <input type="radio" name="theme" value="dark" checked />
      </div>
      <br />
      <div className="connectionInputs">
        <label htmlFor="hostInput">Host</label>
        <br />
        <input type="text" id="hostInput" value={host} />
        <label htmlFor="userInput">User</label>
        <br />
        <input type="text" id="userInput" value={user} />
        <label htmlFor="passwordInput">Password</label>
        <br />
        <input type="text" id="passwordInput" value={password} />
        <label htmlFor="databaseInput">Database</label>
        <br />
        <input type="text" id="dbInput" value={db} />
        <br />
        <br />
      </div>
      <div>
        <button>Test</button> | <button>Set</button>
      </div>
    </div>
  );
}

export default SettingsPanel;
