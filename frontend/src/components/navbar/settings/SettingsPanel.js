import ThemeInputs from "./ThemeInputs";
import ConnectionInputs from "./ConnectionInputs";
import "./SettingsPanel.css";

function SettingsPanel() {
  return (
    <div>
      <ThemeInputs />
      <br />
      <ConnectionInputs />
    </div>
  );
}

export default SettingsPanel;
