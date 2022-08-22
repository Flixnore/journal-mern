import { BrowserRouter, Routes, Route } from "react-router-dom";
import { applyTheme, getSettings } from "./util";

import NavBar from "./pages/NavBar";
import Journal from "./pages/Journal";
import Entries from "./pages/Entries";

function App() {
  getSettings().then((data) => applyTheme(data.theme))
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><NavBar /><Journal /></>} />
        <Route path="/entries" element={<><NavBar /><Entries /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
