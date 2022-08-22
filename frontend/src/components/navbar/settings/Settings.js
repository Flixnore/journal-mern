import { useRef, useEffect } from "react";
import SettingsPanel from "./SettingsPanel";

import "./Settings.css";

function usePanelBlur(ref, closePanel) {
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
    if (panelRef && buttonRef) {
      panelRef.current.classList.toggle("show");
      buttonRef.current.classList.toggle("hide")
    }
  }
  function closePanel() {
    if (panelRef && buttonRef) {
      panelRef.current.classList.remove("show");
      buttonRef.current.classList.remove("hide")
    }
  }
  usePanelBlur(panelRef, closePanel);

  return (
    <div>
      <button ref={buttonRef} onClick={togglePanel}>
        Settings
      </button>
      <div className="hide panel" ref={panelRef}>
        <SettingsPanel />
      </div>
    </div>
  );
}

export default Settings;
