import "./SettingsPanel.css";

function SettingsPanel() {
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
        <label htmlFor="hostInput">Host</label><br />
        <input type="text" id="hostInput" />
        <label htmlFor="userInput">User</label><br />
        <input type="text" id="userInput" />
        <label htmlFor="passwordInput">Password</label><br />
        <input type="text" id="passwordInput" />
        <label htmlFor="databaseInput">Database</label><br />
        <input type="text" id="dbInput" />
        <button className="connect">Connect</button>
      </div>
    </div>
  );
}

export default SettingsPanel;
