import ThemeInputs from "./ThemeInputs";
import ConnectionInputs from "./ConnectionInputs";
import DefaultEntryTypeInputs from "./DefaultEntryTypeInputs";
import "./SettingsPanel.css";

function SettingsPanel() {
  return (
    <div>
      <ThemeInputs />
      <br />
      <ConnectionInputs />
      <br />
      <DefaultEntryTypeInputs />
    </div>
  );
}

export default SettingsPanel;
