import "./Settings.css";
import SettingsPanel from "./SettingsPanel";

function Settings() {
  function togglePanel() {
    const panel = document.getElementById("panel");
    panel.classList.toggle("show");

    const button = document.getElementById("settingsButton");
    button.innerText =
      button.innerText === "Show Settings" ? "Hide Settings" : "Show Settings";
  }

  return (
    <div>
      <button id="settingsButton" onClick={togglePanel}>
        Show Settings
      </button>
      <br />
      <br />
      <div id="panel" className="hidden">
        <SettingsPanel />
      </div>
    </div>
  );
}

export default Settings;
