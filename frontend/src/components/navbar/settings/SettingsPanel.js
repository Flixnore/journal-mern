import ThemeInputs from "./ThemeInputs";
import "./SettingsPanel.css";
import ConnectionInputs from "./ConnectionInputs";

function SettingsPanel() {
  return (
    <div className="panel">
      <ThemeInputs />
      <br />
      <ConnectionInputs />
    </div>
  );
}

export default SettingsPanel;
