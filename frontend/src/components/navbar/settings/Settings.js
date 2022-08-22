import { useRef, useEffect } from "react";
import SettingsPanel from "./SettingsPanel";

import "./Settings.css";

function useTogglePanelBlur(ref, closePanel) {
  useEffect(() => {
    // Close settings panel when clicked outside of it
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closePanel();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closePanel]);
}

function Settings() {
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  function togglePanel() {
    if (panelRef) {
      panelRef.current.classList.toggle("show");
      buttonRef.current.classList.toggle("hide")
    }
  }
  function closePanel() {
    if (panelRef) {
      panelRef.current.classList.remove("show");
      buttonRef.current.classList.remove("hide")
    }
  }
  useTogglePanelBlur(panelRef, closePanel);

  return (
    <div>
      <button ref={buttonRef} onClick={togglePanel}>
        Settings
      </button>
      <div id="panel" className="hide panel" ref={panelRef}>
        <SettingsPanel />
      </div>
    </div>
  );
}

export default Settings;
