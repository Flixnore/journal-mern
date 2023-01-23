import ThemeInputs from "./ThemeInputs";
import ConnectionInputs from "./ConnectionInputs";
import DefaultEntryTypeInputs from "./DefaultEntryTypeInputs";
import AutoSubmitInputs from "./AutoSubmitInputs";
import "./SettingsPanel.css";

function SettingsPanel() {
  return (
    <div>
      <ThemeInputs />
      <br />
      <ConnectionInputs />
      <br />
      <DefaultEntryTypeInputs />
      <br />
      <AutoSubmitInputs />
    </div>
  );
}

export default SettingsPanel;
