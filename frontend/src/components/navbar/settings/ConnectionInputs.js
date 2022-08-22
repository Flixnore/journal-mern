import { useState, useEffect } from "react";
import { getSettings } from "../../../util";

function ConnectionInputs() {
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [db, setDb] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings()
      .then((data) => {
        setHost(data.conn.host);
        setUser(data.conn.user);
        setPassword(data.conn.password);
        setDb(data.conn.database);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading]);

  function changeConn() {
    fetch("/setConn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: host,
        user: user,
        password: password,
        database: db
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        // TODO: error checking
        console.log(text);
      });
  }

  return (
    <div className="connectionInputs">
      <label htmlFor="hostInput">Host</label>
      <br />
      <input
        type="text"
        id="hostInput"
        defaultValue={host}
        onChange={(e) => setHost(e.target.value)}
      />
      <label htmlFor="userInput">User</label>
      <br />
      <input
        type="text"
        id="userInput"
        defaultValue={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <label htmlFor="passwordInput">Password</label>
      <br />
      <input
        type="text"
        id="passwordInput"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="databaseInput">Database</label>
      <br />
      <input
        type="text"
        id="dbInput"
        defaultValue={db}
        onChange={(e) => setDb(e.target.value)}
      />
      <br />
      <div>
        <button onClick={changeConn}>Set Connection</button>
      </div>
    </div>
  );
}

export default ConnectionInputs;
